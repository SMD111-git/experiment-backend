import {  Router } from "express";
import { loginuser, logoutuser, resgiteruser,refreshaccesstoken} from "../controllers/user.controller.js";
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
export default router