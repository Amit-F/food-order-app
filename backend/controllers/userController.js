import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel";


const createToken = (id) => {
    return jwt.sign({id},)
}

// Route for user registration
const registerUser = async (req,res) => {
    
    try {

        const {name, email, password} = req.body;

        // Checking if user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password of at least 8 characters"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = 


    } catch (error) {
        
    }
    
}


// Route for user login
const loginUser = async (req,res) => {
    
}


// Route for admin login
const loginAdmin = async (req,res) => {
    
}

export { registerUser, loginUser, loginAdmin }