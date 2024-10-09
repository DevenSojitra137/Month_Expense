import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        
        // console.log(token);
        
    
        if(!token){
            throw new ApiError(404, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user  = await User.findById(decodedToken?._id).select("-passwrod -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Accass Token")
        }
    
        req.user = user;
        next()
    }catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})