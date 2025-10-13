import mongoose, {Schema}from "mongoose";
const likesSchema=new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:'video'
    },
    likedby:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})
export const Like=mongoose.model("like",likesSchema)