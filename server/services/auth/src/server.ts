import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser"
import dbConnect from "./config/dbConnect.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8001

//home page for the server
app.get("/", (req, res) => {
    res.json("Welcome to the Auth Service")
})


//server listening 
app.listen(port, () => {
    console.log(`Auth service is listening on port ${port}`);
    dbConnect();
})

