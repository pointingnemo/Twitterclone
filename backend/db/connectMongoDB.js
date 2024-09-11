import mongoose from "mongoose";
import Notification from "../models/notification.model.js";

const connectMongoDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error)
    {
        console.error(`Error connecting to mongoDB:${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDB; 