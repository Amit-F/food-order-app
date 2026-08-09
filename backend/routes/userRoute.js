import express from "express";
import { registerCook, registerOrderer, loginUser, toggleFavorite, forgotPassword, resetPassword } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register-cook',registerCook)
userRouter.post('/register-orderer',registerOrderer)
userRouter.post('/login',loginUser)
userRouter.post('/favorite/toggle', requireAuth, toggleFavorite)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

export default userRouter;
