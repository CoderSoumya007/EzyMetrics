import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database Successfully");
    }catch(err){
        console.log("MongoDB connection error:",err);
        process.exit(1);
    }
}

export default connectDB;