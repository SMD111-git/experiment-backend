import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{// thos another listner that handels error before the connection of db
        console.log("error",err);
        throw(err)   
    })
    app.listen(process.env.PORT || 8000)
    console.log(`sever is run at :${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("ERROR DB CONNECTION FALIED", err);
    
})