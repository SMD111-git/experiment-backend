import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})
connectDB() //as this is promise we do in next .then and .catch to show error in connectio or to start the sever with port and db
.then(()=>{
    app.on("error",(error)=>{// thos another listner that handels error before the connection of db
        console.log("error",err);
        throw(err)   
    })
    app.listen(process.env.PORT || 8000) //here the sever is statred at port with db connected  .
    console.log(`sever is run at :${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("ERROR DB CONNECTION FALIED", err);
    
})