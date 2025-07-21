import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app= express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,  //Enables CORS requests only from the domain set in process.env.CORS_ORIGIN.
    credentials:true
}))

// Make sure JSON parsing comes before routes this also middelware
app.use(express.json({limit: "16kb"})) //Parses incoming JSON payloads in HTTP request bodies.//Parses incoming JSON and URL-encoded payloads (like form data).Limits body size to 16kb to prevent large payload attacks.
app.use(express.urlencoded({extended: true, limit: "16kb"}))//Parses incoming URL-encoded form data (e.g. HTML form submissions like <form method="POST">). //username=john&password=1234
app.use(express.static("Public"))//Serves static files from the "Public" folder (e.g., images, CSS, JavaScript files).
app.use(cookieParser())
//routes imports
import userRouter from "./routes/user.routes.js"
//router directions
app.use('/api/v1/users',userRouter)
export {app}
