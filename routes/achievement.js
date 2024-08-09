import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { createAchievement, updateAchievement,getAllUserAchievement, getOneAchievement, deleteUserAchievement  } from "../controller/achievement.js";
import { remoteUpload } from "../Middleware/upload.js";

const achievementRouter = Router();

achievementRouter.post('/users/achievements',  checkUserSession, remoteUpload.single('image'), createAchievement);

achievementRouter.get('/users/achievements',  checkUserSession,getAllUserAchievement);

achievementRouter.get('/users/achievements/:id', checkUserSession, getOneAchievement)

achievementRouter.patch('/users/achievements/:id', checkUserSession,remoteUpload.single('image'), updateAchievement);

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement);

export default achievementRouter;
