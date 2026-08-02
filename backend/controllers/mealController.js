import { v2 as cloudinary } from "cloudinary"
import mealModel from "../models/mealModel.js"
import prepareImageForUpload from "../utils/prepareImageForUpload.js"


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
                const uploadPath = await prepareImageForUpload(file.path)
                const result = await cloudinary.uploader.upload(uploadPath, { resource_type: "image" })
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


// Update Meal Function (cook-only). Existing images the cook didn't replace are
// passed back as `existingImages`; any new image1..image5 files are uploaded and
// appended, so editing (e.g. adding ingredients) never requires re-uploading photos.
const updateMeal = async (req, res) => {

    try {

        const { id, name, description, timeToPrepare, additionalPrepTime, category, subCategory, servingsOptions, ingredients, bestSeller, existingImages } = req.body

        const meal = await mealModel.findOne({ _id: id, householdId: req.user.householdId })

        if (!meal) {
            return res.json({ success: false, message: "Meal not found" })
        }

        const imageFiles = [1, 2, 3, 4, 5]
            .map((n) => req.files?.[`image${n}`]?.[0])
            .filter((file) => file)

        const newImageUrls = await Promise.all(
            imageFiles.map(async (file) => {
                const uploadPath = await prepareImageForUpload(file.path)
                const result = await cloudinary.uploader.upload(uploadPath, { resource_type: "image" })
                return result.secure_url
            })
        )

        const keptImages = existingImages ? JSON.parse(existingImages) : []
        const finalImages = [...keptImages, ...newImageUrls]

        if (finalImages.length === 0) {
            return res.json({ success: false, message: "At least one image is required" })
        }

        meal.name = name
        meal.description = description
        meal.timeToPrepare = Number(timeToPrepare)
        meal.additionalPrepTime = additionalPrepTime === "true" || additionalPrepTime === true
        meal.category = JSON.parse(category)
        meal.subCategory = JSON.parse(subCategory)
        meal.servingsOptions = JSON.parse(servingsOptions)
        meal.ingredients = JSON.parse(ingredients)
        meal.bestSeller = bestSeller === "true" || bestSeller === true
        meal.image = finalImages

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


export { addMeal, updateMeal, removeMeal, singleMeal, listMeals }
