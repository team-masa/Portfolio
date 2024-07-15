import { Router } from "express";
import { createtEducation, updateEducation, getAllUserEducation, deleteUserEducation} from "../controller/education.js";

const educationRouter = Router();


educationRouter.post('/users/education',  checkUserSession, createtEducation)

educationRouter.get('/users/education',  checkUserSession,getAllUserEducation)

educationRouter.patch('/users/education/:id',  checkUserSession,updateEducation)

educationRouter.delete('/users/education/:id', checkUserSession, deleteUserEducation)

export default educationRouter