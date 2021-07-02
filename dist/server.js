"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var productRouter_1 = require("./routes/productRouter");
var db_1 = __importDefault(require("./config/db"));
var path_1 = __importDefault(require("path"));
var userRoutes_1 = require("./routes/userRoutes");
var cors_1 = __importDefault(require("cors"));
var orderRouter_1 = require("./routes/orderRouter");
var uploadRoutes_1 = require("./routes/uploadRoutes");
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
db_1.default();
var app = express_1.default();
if (process.env.NODE_ENV == "development") {
    app.use(morgan_1.default("dev"));
}
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/products", productRouter_1.productRouter);
app.use("/api/upload", uploadRoutes_1.uploadRouter);
app.use("/api/users", userRoutes_1.userRouter);
app.use("/api/orders", orderRouter_1.orderRouter);
app.get("/api/config/paypal", function (req, res) {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
var __dirname = path_1.default.resolve();
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "/uploads")));
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "frontend")));
    app.get("/", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "frontend", "index.html"));
    });
}
app.use(function (error, req, res, next) {
    console.log(error);
    res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.message,
    });
});
app.listen(process.env.PORT, function () {
    return console.log("server running on port " + process.env.PORT);
});
