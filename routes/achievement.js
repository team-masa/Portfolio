import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { createAchievement, updatetAchievement,getAllUserAchievement, deleteUserAchievement  } from "../controller/achievement.js";
import { remoteUpload } from "../Middleware/upload.js";

const achievementRouter = Router();



achievementRouter.post('/users/achievement',  checkUserSession,
    remoteUpload.fields([
        {name: "image", maxCount: 1},
    ]), createAchievement);

achievementRouter.get('/users/achievement',  checkUserSession,getAllUserAchievement);

achievementRouter.patch('/users/achievement/:id', checkUserSession, remoteUpload.fields([
    {name: "image", maxCount: 1},
]), updatetAchievement);

achievementRouter.delete('/users/achievement/:id', checkUserSession, deleteUserAchievement);

export default achievementRouter;
