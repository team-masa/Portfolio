import { createUserSkill, deleteUserSkill, getAllUserSkills, getOneUserSkill, updateUserSkill } from "../controller/skills.js";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";

export const skillRouter = Router()

skillRouter.post('/users/skills', checkUserSession, createUserSkill)
skillRouter.get('/users/skills', checkUserSession, getAllUserSkills)
skillRouter.get('/users/skills/:id', checkUserSession, getOneUserSkill)
skillRouter.patch('/users/skills/:id', checkUserSession, updateUserSkill)
skillRouter.delete('/users/skills/:id', checkUserSession, deleteUserSkill)