import mealModel from "../models/mealModel.js"
import reviewModel from "../models/reviewModel.js"
import uploadAndCleanup from "../utils/uploadAndCleanup.js"

// Add Review Function (either role)
const addReview = async (req, res) => {

    try {

        const { mealId, rating, text } = req.body

        const meal = await mealModel.findOne({ _id: mealId, householdId: req.user.householdId })

        if (!meal) {
            return res.json({ success: false, message: "Meal not found" })
        }

        const ratingNum = Number(rating)
        if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            return res.json({ success: false, message: "Rating must be a whole number from 1 to 5" })
        }

        const trimmedText = (text || "").trim()
        if (!trimmedText) {
            return res.json({ success: false, message: "Review text is required" })
        }

        const photoFiles = [1, 2]
            .map((n) => req.files?.[`photo${n}`]?.[0])
            .filter((file) => file)

        const photoUrls = await Promise.all(photoFiles.map(uploadAndCleanup))

        const review = new reviewModel({
            householdId: req.user.householdId,
            mealId,
            userId: req.user.id,
            rating: ratingNum,
            text: trimmedText,
            photos: photoUrls
        })

        await review.save()
        await review.populate('userId', 'name')

        res.json({ success: true, review })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Remove Review Function (delete-own only, no cook override)
const removeReview = async (req, res) => {

    try {

        const { id } = req.body

        const review = await reviewModel.findOne({ _id: id, householdId: req.user.householdId })

        if (!review) {
            return res.json({ success: false, message: "Review not found" })
        }

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You can only delete your own reviews" })
        }

        await reviewModel.findByIdAndDelete(id)

        res.json({ success: true, message: "Review removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// List Reviews For Meal Function
const listReviewsForMeal = async (req, res) => {

    try {

        const { mealId } = req.params

        const reviews = await reviewModel
            .find({ householdId: req.user.householdId, mealId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })

        res.json({ success: true, reviews })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addReview, removeReview, listReviewsForMeal }
