import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv";
import leadRoutes from "./routes/leadRoutes.js"
import campaignRoutes from "./routes/campaignRoutes.js"
import etlRoutes from "./routes/etlRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"

dotenv.config();
const app=express();

//MiddleWares
app.use(express.json());

//Connect to database
connectDB();

//Routes
app.use("/welcome",(req,res)=>{
    return res.status(200).json({message:"Welcome to Lead Management System"})
})
app.use("/api/leads",leadRoutes)
app.use("/api/campaigns",campaignRoutes)
app.use('/api/etl',etlRoutes)
app.use("/api/reports",reportRoutes)


//error handling middlewares
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});    
})

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server Listening on port ",PORT);
})

export default app;