import {  Router } from "express";
import { loginuser, logoutuser, resgiteruser,refreshaccesstoken, changeCurrentpassword, getuserdetails, updatinguserdeatils, updateuserAvatar, updateuserCoverimage, getuserChannelProfile, getuserwatchhistory} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router= Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
             maxCount:1
        }
    ]),
    resgiteruser)
router.route("/login").post(loginuser)
router.route("/logout").post(verifyJWT,logoutuser) //so to get into futher inside middelware we need to give next()(in the verifyjtw)to so we can router to another file or processs
router.route("/refresh-token").post(refreshaccesstoken)
router.route("/changepassword").post(verifyJWT,changeCurrentpassword)//so first it check the user is verifed or not toghter the middelware and passess to method of contoller
router.route("/current-user").get(verifyJWT,getuserdetails)
router.route("/update-account-details").patch(verifyJWT,updatinguserdeatils)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateuserAvatar)
router.route("/coverimage").patch(verifyJWT,upload.single("coverimage"),updateuserCoverimage)
router.route("/c/:username").get(verifyJWT,getuserChannelProfile)
router.route("/watchhistory").get(verifyJWT,getuserwatchhistory)
export default router