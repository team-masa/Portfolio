import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
// import { createProfile, updateProfile, getUserProfile } from "../controller/profile.js";
import { remoteUpload } from "../Middleware/upload.js";
// import { createUserProject } from "../controller/project.js";
import { createProfile, getUserProfile, updateProfile } from "../controller/userProfile.js";


const userProfileRouter = Router();
userProfileRouter.get("/users/userProfile", getUserProfile);
userProfileRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession,
    createProfile
);

userProfileRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
        {name:"profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession,
    updateProfile
)

export default userProfileRouter;