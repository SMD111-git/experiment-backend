import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/Apierror";
import { Playlist } from "../models/playlist.model";
import { ApiRespone } from "../utils/ApiRespone";


const createplaylist=asyncHandler(async(req,res)=>{
    const {name}=req.body
    if(!name){
        throw new ApiError(400,"name is not creater for the playlist")
    }
    const playlist=await Playlist.create({
        name,
        owner:req.user._id
    })
    if(!playlist){
        throw new ApiError(404,"the playlist was not created")
    }
    return res.status(200).json(200,"the playlist is suceessfully created ")
})
const getuserplaylist=asyncHandler(async(req,res)=>{
    const{userId}= req.params
    const userplaylist=await Playlist.findById({
        owner:userId
    })
    if(!userplaylist ||userplaylist.length==0){
        throw new ApiError(400,"this was not created")
    }
    return res.status(200).json(new ApiRespone(200,"the userplaylist is fecthed suceesfully"))
})
