import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true },
    ordererId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [{
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "meal", required: true },
        servings: { type: Number, required: true },
        notes: { type: String, default: '' }
    }],
    status: {
        type: String,
        enum: ['pending', 'shopping_scheduled', 'shopping_done', 'cook_scheduled', 'completed'],
        default: 'pending'
    },
    weekOf: { type: Date },
    shoppingCalendar: {
        eventId: { type: String },
        scheduledFor: { type: Date }
    },
    cookCalendar: {
        eventId: { type: String },
        scheduledFor: { type: Date }
    },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel
