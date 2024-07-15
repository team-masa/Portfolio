import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import { userRouter } from "./routes/user.js"; 
import educationRouter from "./routes/education.js";
import experienceRouter from "./routes/experience.js";
import achievementRouter from "./routes/achievement.js";
import { projectRouter } from "./routes/project.js";
import profileRouter from "./routes/profile.js";
import { skillRouter } from "./routes/skills.js";
import { volunteeringRouter } from "./routes/volunteer.js";


const app = express();
app.use(express.json());
app.use(cors());

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','Profile', 'Skill', 'Projects', 'Volunteering', 'Experiences', 'Education', 'Achievements'],
    mongooseModels: mongoose.modelNames(), 
})



app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      // Store session
      store: MongoStore.create({
        mongoUrl: process.env.connectionString,
      }),
    })
  );

app.use('/api/v1', userRouter)
app.use("/api/v1", profileRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", achievementRouter);
app.use("/api/v1", skillRouter);
app.use("/api/v1", volunteeringRouter);

await mongoose.connect(process.env.Mongo_Url);

app.listen(7070, () => {
    console.log('App is Listening on Port 7070')
});