import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"

import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

import cors from "cors";

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

});
const app =express();
const PORT=process.env.PORT||5000;

app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend URL
    credentials: true,                // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],    // Allow headers that are necessary for your requests
  }));
  
 
app.options('*', cors());

app.use(cookieParser());

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/post",postRoutes)
app.use("/api/notification",notificationRoutes)



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
})