import express from "express";
import { submitOrder, listOrdersForHousehold, getMyOrders } from "../controllers/orderController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/submit', requireAuth, submitOrder)
orderRouter.get('/household', requireAuth, requireRole('cook'), listOrdersForHousehold)
orderRouter.get('/mine', requireAuth, getMyOrders)

export default orderRouter;
