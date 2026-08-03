import express from "express";
import { connect, oauthCallback, status } from "../controllers/calendarController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const calendarRouter = express.Router();

calendarRouter.get('/connect', requireAuth, requireRole('cook'), connect);
calendarRouter.get('/oauth-callback', oauthCallback); // browser redirect target, no Authorization header — uses signed state instead
calendarRouter.get('/status', requireAuth, requireRole('cook'), status);

export default calendarRouter;
