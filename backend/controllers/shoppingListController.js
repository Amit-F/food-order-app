import shoppingListChecklistModel from "../models/shoppingListChecklistModel.js"
import aggregateShoppingList from "../services/aggregateShoppingList.js"


// Route for the aggregated shopping list (cook-only), with check state merged in
const getShoppingList = async (req, res) => {

    try {

        const items = await aggregateShoppingList(req.user.householdId)

        const checklist = await shoppingListChecklistModel.findOne({ householdId: req.user.householdId })
        const checkedKeys = new Set(
            (checklist?.checkedItems || []).map((i) => `${i.name.toLowerCase()}|${i.unit.toLowerCase()}`)
        )

        const itemsWithChecked = items.map((item) => ({
            ...item,
            checked: checkedKeys.has(`${item.name.toLowerCase()}|${item.unit.toLowerCase()}`)
        }))

        res.json({ success: true, items: itemsWithChecked })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route for toggling a single item's checked state (cook-only)
const toggleChecked = async (req, res) => {

    try {

        const { name, unit } = req.body

        if (!name || !unit) {
            return res.json({ success: false, message: "name and unit are required" })
        }

        let checklist = await shoppingListChecklistModel.findOne({ householdId: req.user.householdId })

        if (!checklist) {
            checklist = new shoppingListChecklistModel({ householdId: req.user.householdId, checkedItems: [] })
        }

        const matches = (i) => i.name.toLowerCase() === name.toLowerCase() && i.unit.toLowerCase() === unit.toLowerCase()
        const existingIndex = checklist.checkedItems.findIndex(matches)

        if (existingIndex >= 0) {
            checklist.checkedItems.splice(existingIndex, 1)
        } else {
            checklist.checkedItems.push({ name, unit })
        }

        await checklist.save()

        res.json({ success: true, checkedItems: checklist.checkedItems })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { getShoppingList, toggleChecked }
