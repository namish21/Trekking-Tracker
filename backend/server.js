import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routing/user-routes.js';
import postRouter from './routing/post-routes.js';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter );
app.use("/posts", postRouter );

mongoose.connect(`mongodb+srv://namish:${process.env.MONGODB_PASSWORD}@cluster0.qtsq5r4.mongodb.net/?retryWrites=true&w=majority`).then(()=>
app.listen(5000, ()=>
    console.log("Connection Succesfull and listening to 5000")    
)).catch((err) => console.log(err));

