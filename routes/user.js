import { getUser, getUsers, login, signup, token } from "../controller/user.js";
import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { remoteUpload } from "../Middleware/upload.js";
// import { createProfile, getUserProfile, updateProfile } from "../controller/userProfile.js";
export const userRouter = Router()

userRouter.get("/users", getUsers);
userRouter.post("/users/auth/login", login);
userRouter.post("/users/auth/token", token);
userRouter.post('/users/auth/signup', signup);
userRouter.get("/users/auth/:userName", getUser);

