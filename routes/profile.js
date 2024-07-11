import { Router } from "express";
import { postProfile } from "../controller/profile.js";
import { remoteUpload } from "../Middleware/upload.js";


const profileRouter = Router();

userRouter.post('/users/profile', remoteUpload.single('profilePicture'), postProfile)



export default profileRouter