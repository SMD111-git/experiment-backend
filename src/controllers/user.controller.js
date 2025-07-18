import {asyncHandler} from "../utils/asyncHandler.js"

const resgiteruser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})


export {resgiteruser}