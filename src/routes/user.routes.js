import {  Router } from "express";
import { resgiteruser } from "../controllers/user.controller.js";

const router= Router()
router.route("/register").post(resgiteruser)
export default router