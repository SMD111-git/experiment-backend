import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/Apierror.js"
import { isemailvalid,ispasswordvaild } from "../utils/Apivalid.js"
import {user} from "../models/user.model.js"
import {uploadOncloudinary} from "../utils/cloudinary.js"
import {ApiRespone} from "../utils/ApiRespone.js"
const resgiteruser = asyncHandler(async(req,res)=>{
   const {fullname,email,username,password}= req.body //acess the client side infromation to access we will use req.body method 
   console.log("email:",email);
   console.log("password:",password);
   
   if(fullname,email,username,password.some((field)=>field?.trim()==="") //so over here we are using  a method some to validated all the input from client and this "some()" has a callback also where we check the actual condition
    ){
     throw new ApiError(400,"GIVE FULL NAME")
   }
   if(!isemailvalid(email) ||!ispasswordvaild(password)){ //checking is the given email and password are valid as per the guide lines
        throw new ApiError(400,"give vaild email && strong password")
   }
   const existeduser=user.findOne({ //method to find is user existing already in web app
    $or:[{username},{email}]
   })
   if(existeduser){
    throw new ApiError(409,"the user with email or username existing")
   }
   const avatarlocalpath=req.files?.avatar[0]?.path //acess the files 
   const coverimagelocalpath=req.files?.coverimage[0]?.path
   if(!avatarlocalpath){//checking the avatra
    throw new (400,"avatar file is required")
   }
   const avatar= await uploadOncloudinary(avatarlocalpath) //as the above we as usinnf async function , to this we can use await bcz it coummnatinng with the cloud sever,
   //  so the process many a bit time consuming so until this does not happen the other code must not excute unitl this code is done or file is uploaded sucessfully
   const coverimage = await uploadOncloudinary(coverimagelocalpath)
   if(!avatar){
    throw new ApiError(400,"avatar is required")
   }
   //creating user object and creating entry in db or storing
   const user = awaituser.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimage?.url || "", //over here as we have not made the coverimage to be compulor to be upload to the not to crashed, 
    // we will have a check if there is coverimage get url or else empty
    password,
    username:username.toLowerCase()
   })
   const createduser=user.findById(user._id).select(
    "-password -refreshToken") // we find the user by this method by the id wwhere the id is genrated by mongodb and also we can remove the password which will not be send to client agian from the sever
    if(!createduser){
        throw new ApiError( 500,"some went worng while resgitering the user")
    }
    //this retrun respones
    return res.status(201).json(
        new ApiRespone(200,createduser,"the user is resgistred sucessfully")
    )
})


export {resgiteruser}