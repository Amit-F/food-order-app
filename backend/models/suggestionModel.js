import mongoose from "mongoose";

// Deliberately NOT household-scoped: this is feedback to the app's developer
// (gated by requireOwner), reachable from any household, not a per-household
// feature like every other model in this app.
const suggestionSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const suggestionModel = mongoose.models.suggestion || mongoose.model("suggestion", suggestionSchema);

export default suggestionModel
