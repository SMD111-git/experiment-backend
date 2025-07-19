import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/Apierror.js"
import { isemailvalid,ispasswordvaild } from "../utils/Apivalid.js"
const resgiteruser = asyncHandler(async(req,res)=>{
   const {fullname,email,username,password}= req.body
   console.log("email:",email);
   console.log("password:",password);
   
   if(fullname,email,username,password.some((field)=>field?.trim()==="") //so over here we are using  a method some to validated all the input from client and this "some()" has a callback also where we check the actual condition
    ){
     throw new ApiError(400,"GIVE FULL NAME")
   }
   if(!isemailvalid(email) &&!ispasswordvaild(password)){
        throw new ApiError(400,"give vaild email && strong password")
   }
})


export {resgiteruser}