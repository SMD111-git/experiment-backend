import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app= express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,  //Enables CORS requests only from the domain set in process.env.CORS_ORIGIN.
    credentials:true
}))
app.use(express.json({limit:"16kb"}))//Parses incoming JSON and URL-encoded payloads (like form data).Limits body size to 16kb to prevent large payload attacks.
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("Public"))//Serves static files from the "Public" folder (e.g., images, CSS, JavaScript files).
app.use(express.cookieParser())
export {app}
