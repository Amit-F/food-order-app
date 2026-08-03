import orderModel from "../models/orderModel.js"
import mealModel from "../models/mealModel.js"
import { createCalendarEvent } from "./calendarController.js"

const TIMEZONE = process.env.CALENDAR_TIMEZONE || 'Asia/Jerusalem'

const combineDateTime = (date, time) => `${date}T${time}:00`

// Pure wall-clock arithmetic (no Date-object timezone conversion involved) so
// adding a duration never depends on what timezone this server happens to run in.
const addMinutesToTime = (date, time, minutes) => {
    const [hours, mins] = time.split(':').map(Number)
    const totalMinutes = hours * 60 + mins + minutes
    const dayOverflow = Math.floor(totalMinutes / (24 * 60))
    const remainingMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60)
    const newHours = Math.floor(remainingMinutes / 60)
    const newMins = remainingMinutes % 60
    const pad = (n) => String(n).padStart(2, '0')

    let newDate = date
    if (dayOverflow !== 0) {
        const d = new Date(`${date}T00:00:00`)
        d.setDate(d.getDate() + dayOverflow)
        newDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    }

    return { date: newDate, time: `${pad(newHours)}:${pad(newMins)}` }
}

const buildOrderDescription = (order) => order.items
    .map((item) => `${item.mealId?.name || 'Meal'} — ${item.servings} servings${item.notes ? ` (${item.notes})` : ''}`)
    .join('\n')


// Route for submitting an order (either role, scoped to the caller's household)
const submitOrder = async (req, res) => {

    try {

        const { items, weekOf } = req.body

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: "Add at least one meal to your order" })
        }

        const validatedItems = []

        for (const item of items) {

            const meal = await mealModel.findOne({ _id: item.mealId, householdId: req.user.householdId })

            if (!meal) {
                return res.json({ success: false, message: "One of the meals in your order could not be found" })
            }

            const servings = Number(item.servings)

            if (!meal.servingsOptions.includes(servings)) {
                return res.json({ success: false, message: `${meal.name} isn't available in ${servings} servings` })
            }

            validatedItems.push({ mealId: meal._id, servings, notes: item.notes || '' })

        }

        const order = await orderModel.create({
            householdId: req.user.householdId,
            ordererId: req.user.id,
            items: validatedItems,
            weekOf: weekOf || undefined
        })

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route for the cook's order-review queue (every order in the household)
const listOrdersForHousehold = async (req, res) => {

    try {

        const orders = await orderModel.find({ householdId: req.user.householdId })
            .populate('items.mealId', 'name image')
            .populate('ordererId', 'name')
            .sort({ createdAt: -1 })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route for the caller's own order history
const getMyOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({ householdId: req.user.householdId, ordererId: req.user.id })
            .populate('items.mealId', 'name image')
            .sort({ createdAt: -1 })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route: cook picks a date/time for the grocery run for a pending order.
// Creates a real Google Calendar event and advances the order's status.
const scheduleShopping = async (req, res) => {

    try {

        const { orderId, date, time, durationMinutes } = req.body

        if (!date || !time) {
            return res.json({ success: false, message: "Pick a date and time for shopping" })
        }

        const order = await orderModel.findOne({ _id: orderId, householdId: req.user.householdId }).populate('items.mealId', 'name')

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        if (order.status !== 'pending') {
            return res.json({ success: false, message: "This order isn't waiting for shopping to be scheduled" })
        }

        const duration = durationMinutes || 60
        const { date: endDate, time: endTime } = addMinutesToTime(date, time, duration)

        const eventId = await createCalendarEvent(req.user.id, {
            summary: 'Grocery Shopping',
            description: buildOrderDescription(order),
            startDateTime: combineDateTime(date, time),
            endDateTime: combineDateTime(endDate, endTime),
            timeZone: TIMEZONE
        })

        order.shoppingCalendar = { eventId, scheduledFor: new Date(combineDateTime(date, time)) }
        order.status = 'shopping_scheduled'
        await order.save()

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route: cook confirms the grocery run actually happened.
const markShoppingDone = async (req, res) => {

    try {

        const { orderId } = req.body
        const order = await orderModel.findOne({ _id: orderId, householdId: req.user.householdId })

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        if (order.status !== 'shopping_scheduled') {
            return res.json({ success: false, message: "This order isn't waiting on a shopping trip" })
        }

        order.status = 'shopping_done'
        await order.save()

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route: cook picks a date/time to actually cook, once shopping is done.
// Defaults the event duration to the longest timeToPrepare among the ordered meals.
const scheduleCooking = async (req, res) => {

    try {

        const { orderId, date, time, durationMinutes } = req.body

        if (!date || !time) {
            return res.json({ success: false, message: "Pick a date and time for cooking" })
        }

        const order = await orderModel.findOne({ _id: orderId, householdId: req.user.householdId }).populate('items.mealId', 'name timeToPrepare')

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        if (order.status !== 'shopping_done') {
            return res.json({ success: false, message: "Shopping needs to be marked done before scheduling cooking" })
        }

        const longestPrep = Math.max(...order.items.map((item) => item.mealId?.timeToPrepare || 60))
        const duration = durationMinutes || longestPrep

        const { date: endDate, time: endTime } = addMinutesToTime(date, time, duration)

        const eventId = await createCalendarEvent(req.user.id, {
            summary: 'Cook Meals',
            description: buildOrderDescription(order),
            startDateTime: combineDateTime(date, time),
            endDateTime: combineDateTime(endDate, endTime),
            timeZone: TIMEZONE
        })

        order.cookCalendar = { eventId, scheduledFor: new Date(combineDateTime(date, time)) }
        order.status = 'cook_scheduled'
        await order.save()

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route: cook confirms cooking is done — the order's full lifecycle is complete.
const markCookingDone = async (req, res) => {

    try {

        const { orderId } = req.body
        const order = await orderModel.findOne({ _id: orderId, householdId: req.user.householdId })

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        if (order.status !== 'cook_scheduled') {
            return res.json({ success: false, message: "This order isn't waiting on cooking" })
        }

        order.status = 'completed'
        await order.save()

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route: orderer cancels their own order, or the cook cancels any order in the
// household — only while still 'pending'. Cancellation only ever happens before
// scheduleShopping has created a calendar event, so there's never a dangling
// Google Calendar event to clean up here; if a later change ever allows
// cancelling a shopping_scheduled/cook_scheduled order, that invariant breaks
// and the corresponding calendar event would need to be deleted too.
const cancelOrder = async (req, res) => {

    try {

        const { orderId } = req.body
        const order = await orderModel.findOne({ _id: orderId, householdId: req.user.householdId })

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        if (order.status !== 'pending') {
            return res.json({ success: false, message: "Only orders still waiting for shopping to be scheduled can be cancelled" })
        }
        if (req.user.role !== 'cook' && order.ordererId.toString() !== req.user.id) {
            return res.json({ success: false, message: "You can only cancel your own orders" })
        }

        order.status = 'cancelled'
        order.cancelledAt = new Date()
        order.cancelledBy = req.user.id
        await order.save()

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { submitOrder, listOrdersForHousehold, getMyOrders, scheduleShopping, markShoppingDone, scheduleCooking, markCookingDone, cancelOrder }
