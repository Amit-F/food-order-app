import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    usedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
})

const inviteModel = mongoose.models.invite || mongoose.model("invite", inviteSchema);

export default inviteModel
