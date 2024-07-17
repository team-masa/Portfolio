
import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteering, getOneVolunteering, updateUserVolunteering } from "../controller/volunteer.js";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";

export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteer', checkUserSession, createUserVolunteering)
volunteeringRouter.get('/users/volunteer/:id', checkUserSession, getOneVolunteering)
volunteeringRouter.get('/users/volunteer', checkUserSession, getAllUserVolunteering)
volunteeringRouter.patch('/users/volunteer/:id', checkUserSession, updateUserVolunteering)
volunteeringRouter.delete('/users/volunteer/:id', checkUserSession, deleteUserVolunteering)