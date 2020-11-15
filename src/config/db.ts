import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        mongoose.set("returnOriginal", false);
        console.log("MongoDB has been connected successfully");
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
