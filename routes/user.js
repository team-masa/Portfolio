import { getUser, getUsers, login, logout, signup, token } from "../controller/user.js";
import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
// import { remoteUpload } from "../Middleware/upload.js";
// import { createProfile, getUserProfile, updateProfile } from "../controller/userProfile.js";
export const userRouter = Router()


userRouter.post('/users/auth/signup', signup);

userRouter.post("/users/auth/login", login);

userRouter.post("/users/auth/token/login", token);

userRouter.get("/users", getUsers);

userRouter.get("/users/auth/:userName", getUser);

userRouter.post("/users/auth/logout", checkUserSession, logout);


