import orderModel from "../models/orderModel.js"
import mealModel from "../models/mealModel.js"


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


export { submitOrder, listOrdersForHousehold, getMyOrders }
