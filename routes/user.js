import { signup } from "../controller/user.js";
import { Router } from "express";

export const userRouter = Router()

userRouter.post('/users/signup', signup)