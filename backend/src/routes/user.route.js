import {Router} from "express";
import { registerUser, logoutUser, loginUser, refreshAccessToken } from "../controller/user.controller.js";


const router1 = Router()

router1.route("/register").post(registerUser);

router1.route("/login").post(loginUser);

router1.route("/logout").post(logoutUser);

router1.route("/refreshAccessToken").post(refreshAccessToken);




export default router1