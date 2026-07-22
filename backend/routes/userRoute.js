import express from "express";
import { registerCook, registerOrderer, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register-cook',registerCook)
userRouter.post('/register-orderer',registerOrderer)
userRouter.post('/login',loginUser)

export default userRouter;