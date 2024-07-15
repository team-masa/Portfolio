import { createUserSkill, deleteUserSkill, getAllUserSkills, updateUserSkill } from "../controller/skills";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";

export const skillRouter = Router()

skillRouter.post('/users/skills', checkUserSession, createUserSkill)
skillRouter.get('/users/skills', checkUserSession, getAllUserSkills)
skillRouter.patch('/users/skills/:id', checkUserSession, updateUserSkill)
skillRouter.delete('/users/skills/:id', checkUserSession, deleteUserSkill)