import  express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";
import { app,server } from "./Socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDb.js"

const PORT=process.env.PORT||5000;

const __dirname=path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});


