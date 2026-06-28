import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express"
//when using type:module it is required to add .js at end 

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

// whenever u want to use a middleware we use app.use
app.use(express.json()); // used to parse the data that is coming from client
app.use(cors({origin:FRONTEND_URL,credentials:true})); // allows only our frontend to access the backend 
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{
    res.status(200).json({ok : true});
})

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})