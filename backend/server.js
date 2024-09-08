import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

const app =express();

dotenv.config();
const PORT=process.env.PORT||5000;
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
})