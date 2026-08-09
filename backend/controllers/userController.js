import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import householdModel from "../models/householdModel.js";
import inviteModel from "../models/inviteModel.js";
import mealModel from "../models/mealModel.js";


const isOwner = (user) => user.email === process.env.APP_OWNER_EMAIL

const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role, householdId: user.householdId, isOwner: isOwner(user) }, process.env.JWT_SECRET)
}

const userResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    householdId: user.householdId,
    favoriteMealIds: user.favoriteMealIds || [],
    isOwner: isOwner(user)
})


// Route for cook registration (no invite required, creates a new Household)
const registerCook = async (req, res) => {

    try {

        const { name, email, password, householdName } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password of at least 8 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: 'cook'
        })

        const household = await householdModel.create({
            name: householdName || `${name}'s Kitchen`,
            cookId: newUser._id
        })

        newUser.householdId = household._id

        let user;
        try {
            user = await newUser.save()
        } catch (saveError) {
            await householdModel.findByIdAndDelete(household._id)
            throw saveError
        }

        const token = createToken(user)

        res.json({ success: true, token, user: userResponse(user) })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// Route for orderer registration (requires a valid invite code tied to a household)
const registerOrderer = async (req, res) => {

    try {

        const { name, email, password, inviteCode } = req.body;

        if (!inviteCode) {
            return res.json({ success: false, message: "An invite code is required to sign up" })
        }

        const invite = await inviteModel.findOne({ code: inviteCode });

        if (!invite) {
            return res.json({ success: false, message: "Invalid invite code" })
        }
        if (invite.usedBy) {
            return res.json({ success: false, message: "This invite code has already been used" })
        }
        if (invite.expiresAt < new Date()) {
            return res.json({ success: false, message: "This invite code has expired" })
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password of at least 8 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: 'orderer',
            householdId: invite.householdId
        })

        const user = await newUser.save()

        invite.usedBy = user._id
        await invite.save()

        const token = createToken(user)

        res.json({ success: true, token, user: userResponse(user) })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// Route for login (shared by both roles)
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user)
            res.json({ success: true, token, user: userResponse(user) })

        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


// Route for toggling a meal as a favorite (either role)
const toggleFavorite = async (req, res) => {

    try {

        const { mealId } = req.body

        const meal = await mealModel.findOne({ _id: mealId, householdId: req.user.householdId })
        if (!meal) {
            return res.json({ success: false, message: "Meal not found" })
        }

        const user = await userModel.findById(req.user.id)
        const index = user.favoriteMealIds.findIndex((id) => id.toString() === mealId)

        if (index >= 0) {
            user.favoriteMealIds.splice(index, 1)
        } else {
            user.favoriteMealIds.push(mealId)
        }

        await user.save()

        res.json({ success: true, favoriteMealIds: user.favoriteMealIds })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { registerCook, registerOrderer, loginUser, toggleFavorite }
