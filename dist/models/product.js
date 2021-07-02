"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var reviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true,
    },
}, { timestamps: true });
var Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
