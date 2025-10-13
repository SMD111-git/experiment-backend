import mongoose,{Schema} from "mongoose";
const playlistSchema= new Schema({
    videos:[{
        type:Schema.Types.ObjectId,
        ref:'video'
    }],
    name:{
        type:String,
        required:'true'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },


})