import { Router } from "express";
import { createEducation, updateEducation, getAllUserEducation, deleteUserEducation} from "../controller/education.js";
import { checkUserSession } from "../Middleware/auth.js";

const educationRouter = Router();


educationRouter.post('/users/education',  checkUserSession, createEducation)

educationRouter.get('/users/education',  checkUserSession, getAllUserEducation)

educationRouter.patch('/users/education/:id',  checkUserSession, updateEducation)

educationRouter.delete('/users/education/:id', checkUserSession, deleteUserEducation)

export default educationRouter