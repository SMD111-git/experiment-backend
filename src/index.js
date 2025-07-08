import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    path:'./.env' //It loads environment variables from a file named .env located in the current directory (./) into process.env.
})
connectDB() //as this is promise we do in next .then and .catch to show error in connectio or to start the sever with port and db
.then(()=>{
    app.on("error",(error)=>{// this another listner that handels error before the connection of db
        console.log("error",err);
        throw(err)   
    })
    app.listen(process.env.PORT || 8000) //here the sever is statred at port with db connected  and staring the sever ,This is the correct, safe way to make sure your DB is connected before starting the server.It avoids race conditions (server starting before DB is ready). .
    console.log(`sever is run at :${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("ERROR DB CONNECTION FALIED", err);
    
})