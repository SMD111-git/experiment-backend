import { request } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT =asyncHandler(async (req,res,next)=>{
    try {
        const tokenacess=req.cookies?.userAcesstoken || req.header("Authorization")?.replace("bearer","") //so here we are acessing the token from client  or if donot get the token as cookies the or method has header way to get the token 
        if(!tokenacess){
            throw new ApiError(400,"unathroized access") //if there is no acess token acess or no  token at all
        }
        //if there is the token then the process of handleing it to verfiy the token from the model and env file token
        const decodedToken= jwt.verify(tokenacess,process.env.ACCESS_TOKEN_SECRET) //verfiy the token from usermodel and to env token
        
        // Validate that the decoded token has the required _id field
        if (!decodedToken._id) {
            throw new ApiError(401, "Invalid token: missing user ID")
        }
        
        const user= await User.findById(decodedToken?._id).select("-password -refreshToken") 
        //"Get the _id from decoded token and use it to find the user in the database, removing password and refreshToken from response"
        if(!user){
            throw new ApiError(401,"invalid acess token")
        }
        req.user=user; //we are sending the acessing of user to request and again the acess of the object in user model schema 
        next()
    } catch (error) {
        throw new ApiError(401,error?.message||"invaid token acsess"); //option chain is used ?.
        
    }
    


})