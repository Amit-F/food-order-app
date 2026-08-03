import express from "express";
import { submitOrder, listOrdersForHousehold, getMyOrders, scheduleShopping, markShoppingDone, scheduleCooking, markCookingDone } from "../controllers/orderController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/submit', requireAuth, submitOrder)
orderRouter.get('/household', requireAuth, requireRole('cook'), listOrdersForHousehold)
orderRouter.get('/mine', requireAuth, getMyOrders)
orderRouter.post('/schedule-shopping', requireAuth, requireRole('cook'), scheduleShopping)
orderRouter.post('/mark-shopping-done', requireAuth, requireRole('cook'), markShoppingDone)
orderRouter.post('/schedule-cooking', requireAuth, requireRole('cook'), scheduleCooking)
orderRouter.post('/mark-cooking-done', requireAuth, requireRole('cook'), markCookingDone)

export default orderRouter;
