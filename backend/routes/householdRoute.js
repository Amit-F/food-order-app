import express from "express";
import { createInvite, getInvite } from "../controllers/householdController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const householdRouter = express.Router();

householdRouter.post('/invite', requireAuth, requireRole('cook'), createInvite)
householdRouter.get('/invite/:code', getInvite)

export default householdRouter;
