import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
// import { createProfile, updateProfile, getUserProfile } from "../controller/profile.js";
import { remoteUpload } from "../Middleware/upload.js";
// import { createUserProject } from "../controller/project.js";
import { createProfile, getUserProfile, updateProfile } from "../controller/userProfile.js";


const profileRouter = Router();

profileRouter.post('/users/profile', checkUserSession, remoteUpload.single('profilePicture'), createProfile)

profileRouter.patch('/users/profile', checkUserSession, remoteUpload.single('profilePicture'), updateProfile)

profileRouter.get('/users/profile',  checkUserSession, getUserProfile)

export default profileRouter