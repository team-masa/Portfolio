import { signup } from "../controller/user.js";
import { Router } from "express";

export const userRouter = Router()

userRouter.post('/users/signup', signup)
userRouter.get('/users/signup', signup)
userRouter.get('users/id/', signup)