import orderModel from "../models/orderModel.js"

// Orders in these statuses still need their ingredients bought.
const PENDING_STATUSES = ['pending', 'shopping_scheduled'];

// Ingredient quantities on a Meal are stored per single serving (see mealModel.js),
// so aggregation multiplies by the ordered (always-even) serving count and sums
// across every order still awaiting a shopping trip.
const aggregateShoppingList = async (householdId) => {

    const orders = await orderModel
        .find({ householdId, status: { $in: PENDING_STATUSES } })
        .populate('items.mealId')

    const totals = new Map()

    for (const order of orders) {
        for (const item of order.items) {
            const meal = item.mealId
            if (!meal) continue // meal may have been deleted since the order was placed

            for (const ingredient of meal.ingredients) {
                const name = ingredient.name.trim()
                const unit = ingredient.unit.trim()
                const key = `${name.toLowerCase()}|${unit.toLowerCase()}`
                const neededQty = ingredient.quantity * item.servings

                if (totals.has(key)) {
                    totals.get(key).quantity += neededQty
                } else {
                    totals.set(key, { name, unit, quantity: neededQty })
                }
            }
        }
    }

    return Array.from(totals.values()).sort((a, b) => a.name.localeCompare(b.name))

}

export default aggregateShoppingList
