import { createUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controller/project.js";
import { checkUserSession } from "../Middleware/auth.js";
import { Router } from "express";
import { remoteUpload } from "../Middleware/upload.js";

export const projectRouter = Router()

projectRouter.post('/users/projects', remoteUpload.single('image'), checkUserSession, createUserProject)
projectRouter.get('/users/projects', checkUserSession, getAllUserProjects)
projectRouter.patch('/users/projects/:id', remoteUpload.single('image'), checkUserSession, updateUserProject)
projectRouter.delete('/users/projects/:id', checkUserSession, deleteUserProject)