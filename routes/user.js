import { getUser, getUsers, login, signup } from "../controller/user.js";
import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { remoteUpload } from "../Middleware/upload.js";
import { createdUserProfile, getUserProfile, updateUserProfile } from "../controller/userProfile.js";

export const userRouter = Router()

userRouter.get("/users", getUsers);
userRouter.post("/users/auth/login", login);
userRouter.post('/users/auth/signup', signup);
userRouter.post("/users/auth/:userName", getUser);
userRouter.get("/users/userProfile", getUserProfile);
userRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession,
    createdUserProfile
);

userRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
        {name:"profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession,
    updateUserProfile
)
