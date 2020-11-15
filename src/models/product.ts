import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema<ReviewInterface>(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: { type: String, required: true },
        rating: { type: String, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema<ProductInterface>(
    {
        name: { type: String, required: true },
        user: {
            type: mongoose.Types.ObjectId,
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
    },
    { timestamps: true }
);

interface ReviewInterface {
    user: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
}

interface ProductInterface extends mongoose.Document {
    name: string;
    brand: string;
    countInStock: number;
    price: number;
    numReviews: number;
    category: string;
    image: string;
    description: string;
    rating: number;
    reviews: ReviewInterface[];
    user: mongoose.Types.ObjectId;
}

const Product = mongoose.model<ProductInterface>("Product", productSchema);

export default Product;
