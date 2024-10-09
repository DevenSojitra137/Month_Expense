import {Router} from "express";
import { registerUser, logoutUser, loginUser, refreshAccessToken } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router1 = Router()

router1.route("/register").post(registerUser);

router1.route("/login").post(loginUser);

router1.route("/logout").post(verifyJWT,logoutUser);

router1.route("/refreshAccessToken").post(refreshAccessToken);




export default router1