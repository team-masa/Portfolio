import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { remoteUpload } from "../Middleware/upload.js";
import {
  createProfile,
  getUserProfile,
  updateProfile,
} from "../controller/userProfile.js";

const userProfileRouter = Router();

userProfileRouter.get("/users/userProfile", checkUserSession, getUserProfile);

userProfileRouter.post(
  "/users/userProfile",
  remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }]),
  checkUserSession,
  createProfile
);

userProfileRouter.patch(
  "/users/userProfile/:id",
  checkUserSession,
  remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }]),
  updateProfile
);

export default userProfileRouter;
