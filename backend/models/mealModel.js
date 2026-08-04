import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    timeToPrepare: { type: Number, required: true },
    additionalPrepTime: { type: Boolean, default: false },
    image: { type: [String], required: true },
    category: { type: [String], required: true },
    subCategory: { type: [String], required: true },
    // The cook always batches for at least himself + his partner, so every
    // orderable serving count must be a multiple of 2 (see ingredients note below).
    servingsOptions: {
        type: [Number],
        required: true,
        validate: {
            validator: (options) => options.length > 0 && options.every((n) => Number.isInteger(n) && n > 0 && n % 2 === 0),
            message: "servingsOptions must be a non-empty list of positive multiples of 2"
        }
    },
    // Each ingredient quantity is the amount needed for a single serving.
    // The shopping-list aggregator multiplies by the ordered (always-even) serving
    // count and sums across orders, so this convention must be followed consistently.
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        allergens: { type: [String], default: [] }
    }],
    bestSeller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
})

const mealModel = mongoose.models.meal || mongoose.model("meal", mealSchema);

export default mealModel
