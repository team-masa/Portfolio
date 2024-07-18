
import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteering, updateUserVolunteering } from "../controller/volunteer.js";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";

export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createUserVolunteering)
volunteeringRouter.get('/users/volunteering', checkUserSession, getAllUserVolunteering)
volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, updateUserVolunteering)
volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteUserVolunteering)