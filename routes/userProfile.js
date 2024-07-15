import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { createProfile, updateProfile, getUserProfile } from "../controller/profile.js";
import { remoteUpload } from "../Middleware/upload.js";


const profileRouter = Router();

userRouter.post('/users/profile', checkUserSession, remoteUpload.single('profilePicture'), createProfile)

userRouter.patch('/users/profile', checkUserSession, remoteUpload.single('profilePicture'), updateProfile)

userRouter.get('/users/profile',  checkUserSession, getUserProfile)

export default profileRouter