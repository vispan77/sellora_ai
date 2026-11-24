import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan"
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))




const port = process.env.PORT || 8000; 

//home route to check 
app.get("/", (req, res) => {
    res.json("Hello from the Sellora Gateway");
})

//midleware that transfer the request from the gateway to the perticular microservices
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL as string))

app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
})



