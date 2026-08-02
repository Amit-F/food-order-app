import mongoose from "mongoose";

const shoppingListChecklistSchema = new mongoose.Schema({
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true, unique: true },
    checkedItems: [{
        name: { type: String, required: true },
        unit: { type: String, required: true }
    }]
})

const shoppingListChecklistModel = mongoose.models.shoppingListChecklist || mongoose.model("shoppingListChecklist", shoppingListChecklistSchema);

export default shoppingListChecklistModel
