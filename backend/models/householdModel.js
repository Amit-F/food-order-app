import mongoose from "mongoose";

const householdSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cookId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now }
})

const householdModel = mongoose.models.household || mongoose.model("household", householdSchema);

export default householdModel
