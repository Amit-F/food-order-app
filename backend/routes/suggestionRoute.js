import express from "express";
import { addSuggestion, listSuggestions, removeSuggestion } from "../controllers/suggestionController.js";
import { requireAuth, requireOwner } from "../middleware/auth.js";

const suggestionRouter = express.Router();

suggestionRouter.post('/add', requireAuth, addSuggestion);
suggestionRouter.get('/list', requireAuth, requireOwner, listSuggestions);
suggestionRouter.post('/remove', requireAuth, requireOwner, removeSuggestion);

export default suggestionRouter;
