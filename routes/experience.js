import { Router } from "express";
import { checkUserSession } from "../Middleware/auth.js";
import { createExperience, updateExperience, getAllUserExperience, getOneExperience, deleteExperience } from "../controller/experience.js";

const experienceRouter = Router();

experienceRouter.post('/users/experience', checkUserSession,createExperience)

experienceRouter.get('/users/experience', checkUserSession, getAllUserExperience)

experienceRouter.get('/users/experience/:id', checkUserSession, getOneExperience)


experienceRouter.patch('/users/experience/:id', checkUserSession, updateExperience)

experienceRouter.delete('/users/experience/:id', checkUserSession, deleteExperience)

export default experienceRouter