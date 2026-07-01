import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import path from "path"
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js"
//when using type:module it is required to add .js at end 

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(),"public");
// we do not parse the webhook eventt data it should be in raw format
app.use("/api/webhooks/clerk",express.raw({ type: "application/json" }), clerkWebhook);

// whenever u want to use a middleware we use app.use
app.use(express.json()); // used to parse the data that is coming from client
app.use(cors({origin:FRONTEND_URL,credentials:true})); // allows only our frontend to access the backend 
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{
    res.status(200).json({ok : true});
})

    // if the public directory exists, serve the static files 
    if(fs.existsSync(publicDir)){
        app.use(express.static(publicDir));

        app.get("/{*any}",(req,res,next) => {
            res.sendFile(path.join(publicDir,"index.html"),(err) => next(err));
        })
    }

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);

    if(process.env.NODE_ENV === "production"){
        job.start();
    }
})