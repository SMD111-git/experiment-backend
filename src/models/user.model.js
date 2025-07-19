import mongoose,{model, Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //this make the db searchable
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
        index:true

    },
    avatar:{
        type:String,
        required:true
    },
    coverimage:{
        type:String,

    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'video'
        }
    ],
    password:{
        type:String,
        required:[true,'password  is required']

    },
    refreshToken:{
        type:String
    },
   
},{timestamps:true});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();//these is condition check's if the password is modified or not  if modified  it goes to below statement 
    //if the password is not changed  then it return to next 
    this.password= await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){//this is a "method" we add are a porptery ispasswordcorrect into the "method"
    //this method check if the password is same or not  in bcrypt we have method compare 
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAcesstoken=function(){
  return  jwt.sign( //this login hanler part 
        {
            _id:this._id, //this is payload to genrate a token for the user and this. email all are coming from db
            email:this.email,
            username:this.username,
            fullname:this.fullname

        },
        process.env.ACESS_TOKEN_SECERT,
        {expiresIn:process.env.ACESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshtoken=function(){
   return jwt.sign(
        {
            _id:this._id, //this is payload to genrate a token for the user and this. email all are coming from db
            

        },
        process.env.REFRESH_TOKEN_SCERET,
        {expiresIn:REFRESH_TOKEN_EXPIRY}
    )
}

export const user= mongoose.model("user",userSchema)