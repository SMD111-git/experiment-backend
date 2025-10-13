import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema= new Schema({
    commentedby:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:'video'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    content:{
        type:String,
        required:'true'
    }
},{timestamps:'true'})
commentSchema.plugin(mongooseAggregatePaginate)
export const Comment=mongoose.model("comment",commentSchema)