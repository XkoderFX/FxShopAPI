import express, { NextFunction } from "express";
import { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRouter";
import connectDB from "./config/db";
import path from "path";
import { userRouter } from "./routes/userRoutes";
import ServerError from "./controllers/ServerError";
import cors from "cors";
import { orderRouter } from "./routes/orderRouter";
import { uploadRouter } from "./routes/uploadRoutes";
import morgan from "morgan";
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "frontend")));
    app.get("/", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
    );
}

app.use(
    (error: ServerError, req: Request, res: Response, next: RequestHandler) => {
        console.log(error);
        res.status(error.statusCode).send({
            status: error.statusCode,
            error: error.message,
        });
    }
);

app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`)
);
