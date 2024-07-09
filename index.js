import express from "express";
import mongoose from "mongoose";



const app = express();
app.use(express.json());


await mongoose.connect(process.env.Mongo_Url);

app.listen(7070, () => {
    console.log('App is Listening')
});