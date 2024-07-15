import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import { userRouter } from "./routes/user.js"; 
import educationRouter from "./routes/education.js";
import experienceRouter from "./routes/experience.js";
import achievementRouter from "./routes/achievement.js";
import { projectRouter } from "./routes/project.js";
import profileRouter from "./routes/userProfile.js";
import { skillRouter } from "./routes/skills.js";
import { volunteeringRouter } from "./routes/volunteer.js";



const app = express();
app.use(express.json());

app.use('/api/v1', userRouter)


await mongoose.connect(process.env.MONGO_URL);

app.listen(7070, () => {
    console.log('App is Listening on Port 7070')
});