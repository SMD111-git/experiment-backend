import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/Apierror";
import { ApiRespone } from "../utils/ApiRespone";
const videoliked=asyncHandler(async(req,res)=>{
    const{videoId}=req.params;
    const userId=req.user._id;

    if(isValidObjectId(videoId)){
        throw new ApiError(400,"invalid video id")
    }
    const existinglike= await Like.findOne({
        video:videoId,
        likedby:userId
    })
    if(existinglike){
        await Like.findByIdAndDelete(existinglike._id)
        return res.status(201).json(new ApiRespone(200,"the video sucessfully un liked"))
    }
    
    const likevideo=await Like.create({
        video:videoId,
        likedby:userId
    })
    return res.status(201).json(new ApiRespone(201,"video liked succesfully"))  
})

const commetsliked= asyncHandler(async(req,res)=>{
    const{commentId}=req.params;
    const userId=req.user._id;
    const existinglikedcomment=await Like.findOne({
        comment:commentId,
        likedby:userId
    })
    if(existinglikedcomment){
        await Like.findByIdAndDelete(existinglikedcomment._id)
        return res.status(200).json(new ApiRespone(200,"the comment is sucessfully unliked"))
    }
    const likedcomment=await Like.create({
        comment:commentId,
        likedby:userId
    })
    return res.status(201).json(new ApiRespone(201,"the comment is successfully liked"))
})

