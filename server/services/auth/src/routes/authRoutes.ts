import express from "express";

const authRouter = express.Router();


//import the controller
import { login, logout } from "../controllers/authControllers.js";


//mapp the routes
authRouter.post("/login", login);
authRouter.get("/logout", logout);


//export the authrouter
export default authRouter;