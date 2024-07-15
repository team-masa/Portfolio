import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import { userRouter } from "./routes/user.js"; 
import "dotenv/config";



const app = express();
app.use(express.json());

app.use('/api/v1', userRouter)


await mongoose.connect(process.env.MONGO_URL);

app.listen(7070, () => {
    console.log('App is Listening on Port 7070')
});