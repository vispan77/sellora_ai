
import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth"
import app from "../config/firebase.js";
import User, { IUser } from "../models/User.js";

const login = async(req: Request, res: Response) => {
    try {
        const {token} = req.body;

        const decoded = await getAuth(app).verifyIdToken(token);

        //check if the user exits in the db or not
        let user = await User.findOne({
            firebaseUid: decoded.uid
        })

        //if the user not exist then create user in the db
        if(!user){
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name || "",
                email: decoded.email || ""
            })
        }

        const session = crypto.randomUUID();
    } catch (error) {
        
    }
}
