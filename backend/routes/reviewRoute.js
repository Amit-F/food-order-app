import express from "express";
import { addReview, removeReview, listReviewsForMeal } from "../controllers/reviewController.js";
import upload from "../middleware/multer.js";
import { requireAuth } from "../middleware/auth.js";

const reviewRouter = express.Router();

const photoFields = [{name:'photo1',maxCount:1}, {name:'photo2',maxCount:1}];

reviewRouter.post('/add', requireAuth, upload.fields(photoFields), addReview);
reviewRouter.post('/remove', requireAuth, removeReview);
reviewRouter.get('/meal/:mealId', requireAuth, listReviewsForMeal);

export default reviewRouter;
