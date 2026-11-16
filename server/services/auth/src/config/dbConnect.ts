import momgoose from "mongoose";

const dbConnect = async () => {
    try {
        const url = process.env.MONGODB_URL!;
        if (!url) {
            throw new Error("MONGODB_URL is not defined");
        }
        await momgoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default dbConnect;


