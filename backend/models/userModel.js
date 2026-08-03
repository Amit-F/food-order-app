import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['cook', 'orderer'], required: true },
    householdId: { type: mongoose.Schema.Types.ObjectId, ref: "household", required: true },
    favoriteMealIds: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "meal" }], default: [] },
    google: {
        connected: { type: Boolean, default: false },
        refreshToken: { type: String, select: false },
        accessToken: { type: String, select: false },
        accessTokenExpiry: { type: Date },
        calendarId: { type: String, default: 'primary' }
    }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel
