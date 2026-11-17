
import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth"
import app from "../config/firebase.js";
import User, { IUser } from "../models/User.js";
import redis from "../../../../shared/redis/redis.js"
import { successResponse, errorResponse } from "../utils/helperFunction.js"

const login = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        const decoded = await getAuth(app).verifyIdToken(token);

        //check if the user exits in the db or not
        let user = await User.findOne({
            firebaseUid: decoded.uid
        })

        //if the user not exist then create user in the db
        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name || "",
                email: decoded.email || ""
            })
        }

        const sessionId = crypto.randomUUID();

        //set the sesision Id in the redis in string 
        await redis.set(`session:${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }), "EX", 7 * 24 * 60 * 60) // 7 days expiry

        //set this session id in the cookie
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        //return success response using helper function
        return successResponse(201, true, "User logged in successfully", user)

    } catch (error) {
        return errorResponse(500, false, `Login failed ${error}`)
    }
}


//logout function 
const logout = async (req: Request, res: Response) => {
    try {
        //get the sessionId from the cookies
        const sessionId = req.cookies?.session;

        //delete the session id from the redis
        if (sessionId) {
            await redis.del(`session: ${sessionId}`)
        }

        //remove the session id from the cookie also
        res.clearCookie("session", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        return successResponse(200, true, "User Logout Successfully")
    } catch (error) {
        return errorResponse(500, false, `Logout failed ${error}`)
    }
}

export {
    login,
    logout
}



