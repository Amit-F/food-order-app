import { v2 as cloudinary } from "cloudinary"
import mealModel from "../models/mealModel.js"


// Add Meal Function (cook-only)
const addMeal = async (req, res) => {

    try {

        const { name, description, timeToPrepare, additionalPrepTime, category, subCategory, servingsOptions, ingredients, bestSeller } = req.body

        const imageFiles = [1, 2, 3, 4, 5]
            .map((n) => req.files?.[`image${n}`]?.[0])
            .filter((file) => file)

        if (imageFiles.length === 0) {
            return res.json({ success: false, message: "At least one image is required" })
        }

        const imageUrls = await Promise.all(
            imageFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        const meal = new mealModel({
            householdId: req.user.householdId,
            createdBy: req.user.id,
            name,
            description,
            timeToPrepare: Number(timeToPrepare),
            additionalPrepTime: additionalPrepTime === "true" || additionalPrepTime === true,
            image: imageUrls,
            category: JSON.parse(category),
            subCategory: JSON.parse(subCategory),
            servingsOptions: JSON.parse(servingsOptions),
            ingredients: JSON.parse(ingredients),
            bestSeller: bestSeller === "true" || bestSeller === true
        })

        await meal.save()

        res.json({ success: true, meal })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Remove Meal Function (cook-only)
const removeMeal = async (req, res) => {

    try {

        const { id } = req.body

        const meal = await mealModel.findOne({ _id: id, householdId: req.user.householdId })

        if (!meal) {
            return res.json({ success: false, message: "Meal not found" })
        }

        await mealModel.findByIdAndDelete(id)

        res.json({ success: true, message: "Meal removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Single Meal Details Function
const singleMeal = async (req, res) => {

    try {

        const { id } = req.params

        const meal = await mealModel.findOne({ _id: id, householdId: req.user.householdId })

        if (!meal) {
            return res.json({ success: false, message: "Meal not found" })
        }

        res.json({ success: true, meal })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// List Meals Function (scoped to the caller's household)
const listMeals = async (req, res) => {

    try {

        const meals = await mealModel.find({ householdId: req.user.householdId }).sort({ date: -1 })

        res.json({ success: true, meals })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { addMeal, removeMeal, singleMeal, listMeals }
