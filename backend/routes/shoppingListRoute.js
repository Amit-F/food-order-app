import express from "express";
import { getShoppingList, toggleChecked } from "../controllers/shoppingListController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const shoppingListRouter = express.Router();

shoppingListRouter.get('/', requireAuth, requireRole('cook'), getShoppingList)
shoppingListRouter.post('/toggle', requireAuth, requireRole('cook'), toggleChecked)

export default shoppingListRouter;
