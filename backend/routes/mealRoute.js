import express from "express";
import { addMeal, updateMeal, removeMeal, singleMeal, listMeals } from "../controllers/mealController.js";
import upload from "../middleware/multer.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const mealRouter = express.Router();

const imageFields = [{name:'image1',maxCount:1}, {name:'image2',maxCount:1}, {name:'image3',maxCount:1}, {name:'image4',maxCount:1}, {name:'image5',maxCount:1} ];

mealRouter.post('/add', requireAuth, requireRole('cook'), upload.fields(imageFields), addMeal);
mealRouter.post('/update', requireAuth, requireRole('cook'), upload.fields(imageFields), updateMeal);
mealRouter.post('/remove', requireAuth, requireRole('cook'), removeMeal);
mealRouter.get('/single/:id', requireAuth, singleMeal);
mealRouter.get('/list', requireAuth, listMeals);

export default mealRouter;
