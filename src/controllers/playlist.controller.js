import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/Apierror";
import { Playlist } from "../models/playlist.model";
import { ApiRespone } from "../utils/ApiRespone";
import { User } from "../models/user.model";
import { video } from "../models/video.model";


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
const Addvideoplaylist=asyncHandler(async(req,res)=>{
    const {playlist_id,video_id}=req.params;
    if(!isValidObjectId(playlist_id) || !isValidObjectId(video_id)){
        throw new ApiError(400,"innvalid playlistID or videoID")

    }
    const playlist=await Playlist.findById(playlist_id)
    if(req.user_id.toString() !=playlist.owner.toString()){
        throw new ApiError(400,"as your not authoried user to access")
    }
    const updateplaylist=await Playlist.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(playlist_id)
            },
        },
        {
            $addFields:{
             Videos:{
                    $setUnion:["$Videos",[new   mongoose.Types.ObjectId(video_id)]]       
                },
            },
        },
        {
            $merge:{
                into:"playlists",
            },
        },

        
    ])
    if(!updateplaylist){
        throw new ApiError(400,"the playlist is not existing to update")
    }
    return res.status(200).json(new ApiRespone(200,updateplaylist,"video is sucessfully updated"))
    

})
const removeplaylist=asyncHandler(async(req,res)=>{
    const deleteplaylist=req.params(playlist_id)
})

