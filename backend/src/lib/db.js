import mongoose from "mongoose";
import 'dotenv/config'
// connection to database

export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI;

        if(!mongoUri){
            throw new Error("MONGO_URI is required");
        }

        const conn = await mongoose.connect(mongoUri);
        console.log("Mongodb connected",conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error",error.message);
        process.exit(1);
        //1 means failed,0 means success
    }
}