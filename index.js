import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import session from "express-session";
import { restartServer } from "./restart_server.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import "dotenv/config";
import passport from "passport";
import { userRouter } from "./routes/user.js";
import educationRouter from "./routes/education.js";
import experienceRouter from "./routes/experience.js";
import achievementRouter from "./routes/achievement.js";
import { projectRouter } from "./routes/project.js";
import userProfileRouter from "./routes/userProfile.js";
import { skillRouter } from "./routes/skills.js";
import { volunteeringRouter } from "./routes/volunteer.js";
// import { authRouter } from "./routes/googleAuth.js";


const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));

expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ['auth', 'Profile', 'Skill', 'Projects', 'Volunteering', 'Experience', 'Education', 'Achievement'],
  mongooseModels: mongoose.modelNames(),
})

app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Store session
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});


// app.use( authRouter);
app.use('/api/v1', userRouter)
app.use("/api/v1", userProfileRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", achievementRouter);
app.use("/api/v1", skillRouter);
app.use("/api/v1", volunteeringRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL)
}

async function startServer () { await mongoose.connect(process.env.MONGO_URL);
console.log("Database is connected")
  .then(() => {
    app.listen(7070, () => {
      reboot().then(() => {
        console.log(`Server Restarted`)
      });
      console.log(`Server is Connected To Port`)
    });
  })
}