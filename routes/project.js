import { createUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controller/project.js";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";
// import { remoteUpload } from "../Middleware/upload.js";

export const projectRouter = Router()


projectRouter.post('/users/projects', checkUserSession, createUserProject),

projectRouter.get('/users/projects', checkUserSession, getAllUserProjects)

projectRouter.patch('/users/projects/:id',checkUserSession, updateUserProject)

projectRouter.delete('/users/projects/:id', checkUserSession, deleteUserProject)