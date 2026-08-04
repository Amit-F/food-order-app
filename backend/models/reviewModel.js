import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true },
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "meal", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    photos: {
        type: [String],
        default: [],
        validate: {
            validator: (photos) => photos.length <= 2,
            message: "A review can have at most 2 photos"
        }
    },
    createdAt: { type: Date, default: Date.now }
})

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel
