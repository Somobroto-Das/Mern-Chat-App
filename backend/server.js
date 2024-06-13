import  express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDb.js"

const app=express();
const PORT=process.env.PORT||5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/user",userRoutes);
// app.get("/",(req,res)=>{
//     res.send("Hello World!!")
// })


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on this port ${PORT}`)
});




