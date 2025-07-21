import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/Apierror.js"
import { isemailvalid,ispasswordvaild } from "../utils/Apivalid.js"
import { User} from "../models/user.model.js"
import {uploadOncloudinary} from "../utils/cloudinary.js"
import {ApiRespone} from "../utils/ApiRespone.js"

const generateAcessANDRefreshtoken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const userAcesstoken = user.generateAcesstoken()
        const userRefreshtoken = user.generateRefreshtoken()
        
        user.refreshToken = userRefreshtoken //r
        await user.save({ validateBeforeSave: false })
        
        return { userAcesstoken, userRefreshtoken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}
const resgiteruser = asyncHandler(async(req,res)=>{
   const {fullname,email,username,password}= req.body //acess the client side infromation to access we will use req.body method 
   
   /*console.log("Extracted values:");
   console.log("fullname:", fullname);
   console.log("email:", email);  
   console.log("username:", username);
   console.log("password:", password ? "***provided***" : "undefined"); */
   //console.log("email:",email);
   
   //console.log("password:",password);
   
   if(
    [fullname,email,username,password].some((field)=>field?.trim()==="") //so over here we are using  a method some to validated all the input from client and this "some()" has a callback also where we check the actual condition
    ){
     throw new ApiError(400,"GIVE FULL NAME")
   }
   if(!isemailvalid(email) ||!ispasswordvaild(password)){ //checking is the given email and password are valid as per the guide lines
        throw new ApiError(400,"give vaild email && strong password")
   }
   const existeduser= await User.findOne({ //method to find is user existing already in web app
    $or:[{username},{email}]
   })
   if(existeduser){
    throw new ApiError(409,"the user with email or username existing")
   }
   
   const avatarlocalpath=req.files?.avatar[0]?.path; //access the files from local file system (public) then is accessed

   //const coverimagelocalpath=req.files?.coverimage[0]?.path;// this line of code has some issues regarding when the file is empty and shows error but it is not mandatory to send the file to covercome this
   let coverimagelocalpath;
   if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length>0){
        coverimagelocalpath=req.files.coverimage[0].path
    } //this another method of handeling the coverimage , even if we donot give coverimage
   
   if(!avatarlocalpath){//checking the avatar
    throw new ApiError(400,"avatar file is required")
   }
   
   const avatar= await uploadOncloudinary(avatarlocalpath) //as the above we as usinnf async function , to this we can use await bcz it coummnatinng with the cloud sever,
   //  so the process many a bit time consuming so until this does not happen the other code must not excute unitl this code is done or file is uploaded sucessfully
   
   const coverimage = await uploadOncloudinary(coverimagelocalpath)
   if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   
    //creating user object and creating entry in db or storing
   
   const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimage?.url || "", //over here as we have not made the coverimage to be compulor to be upload to the not to crashed, 
    // we will have a check if there is coverimage get url or else empty
    password,
    email,
    username: username?.toLowerCase() || ""
   })
   const createduser= await User.findById(user._id).select(
    "-password -refreshToken") // we find the user by this method by the id wwhere the id is genrated by mongodb and also we can remove the password which will not be send to client agian from the sever
    if(!createduser){
        throw new ApiError( 500,"some went worng while resgitering the user")
    }
    //this retrun respones
    return res.status(201).json(
        new ApiRespone(200,createduser,"the user is resgistred sucessfully")
    )
})

const loginuser=asyncHandler(async(req,res)=>{
    //req boby getting data
    //usernamed or email based acess to site
    //find the user in db or  no user in 
    //password check
    //acess annd refresh token
    //sent to cookies 
      const {username,email, password} = req.body
      console.log(email)
    if(!username && !email){ //if there are now username or email of the client from form
        throw new ApiError(400,"username or email is required ")
    }
    const user= await User.findOne({ //if there user in we can find it in db 
        $or:[{username},{email}] //this mongodb operator where it check any one value either from username or email from db
    })
    if(!user){ //if the user is not in the db it throw this
        throw new ApiError(400,"username or email is not existing in the db")
    }
     const ispasswordvaild= await user.isPasswordCorrect(password) //so over here we are acess the password by the varaiable user above this line of code where are using to find the email  and usernbame
     if(!ispasswordvaild){
        throw new ApiError(401,"this password is wrong ")
     }
     const {userAcesstoken,userRefreshtoken}=await generateAcessANDRefreshtoken(user._id) //this verify user_.id  with the token genrrated
     const loggedin = await User.findById(user._id).select("-password -refreshToken")
     const options={//this are cookies
        httpOnly:true,
        secure:true
     }
     return res.status(200).cookie("userAcesstoken",userAcesstoken,options)
     .cookie("userRefreshtoken",userRefreshtoken,options)
     .json(new ApiRespone(200,{
        user:loggedin,
        userAcesstoken,//this data which we reflect on postman or on client broswer
        userRefreshtoken
     },
     "user is sucessfully loggedin"
    ))
})

const logoutuser = asyncHandler(async(req, res) => {
    // TODO: Implement logout functionality
    // Clear refresh token from database
    // Clear cookies
    // Return success response
    await User.findByIdAndUpdate( // this db method 
        req.user._id, //find id by re method frommiddelware in db
        {
            $set:{ //update filed in db 
                refreshToken:undefined
            }
        },
        {
            new:true // this push in db filed of refreshtoken
        }
    )
    const options={//this are cookies
        httpOnly:true,
        secure:true
     }

    res.status(200).clearCookie("userAcesstoken",options).clearCookie("userRefreshtoken",options).json(
        new ApiRespone(200, {}, "User logged out successfully")
    )
})

export {resgiteruser, loginuser, logoutuser}