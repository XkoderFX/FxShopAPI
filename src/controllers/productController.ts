import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import ServerError from "./ServerError";

export const getProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).send(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(202).send({ message: "product deleted successfully" });
    } catch (Error) {
        const error = new ServerError(Error.message, 404);
        throw error;
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });

    const createdProduct = await product.save();
    try {
        res.status(202).send(createdProduct);
    } catch (Error) {
        const error = new ServerError(Error.message, 404);
        throw error;
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = (req as any).user;
    try {
        const {
            name,
            price,
            description,
            image,
            brand,
            category,
            countInStock,
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            image,
            brand,
            category,
            countInStock,
        });

        console.log(updatedProduct);

        res.status(202).send({
            message: "product updated successfully",
            updatedProduct,
        });
    } catch (error) {
        next(new ServerError(error.message, 500));
    }
};

export const createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = (req as any).user;
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(id);
        if (product) {
            const alreadyReviewed = product.reviews.find(
                (review) => review.user.toString() === user._id.toString()
            );
            if (alreadyReviewed) {
                const error = new ServerError("Product already reviewed", 400);
                next(error);
            } else {
                const review = {
                    name: user.name,
                    rating: Number(rating),
                    comment,
                    user: user._id,
                };

                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating =
                    product.reviews.reduce(
                        (acc, item) => Number(acc) + Number(item.rating),
                        0
                    ) / product.reviews.length;

                await product.save();
                res.status(201).json({ message: "Review added" });
            }
        } else {
            next(new ServerError("Product not found", 404));
        }
    } catch (error) {
        next(new ServerError(error.message, 500));
    }
};

export const getTopProducts = async (req: Request, res: Response) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
};

export const getProducts = async (req: Request, res: Response) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword?.toString() || "";
    const regex = new RegExp(keyword, "i");
    const count = await Product.countDocuments({ name: { $regex: regex } });
    const products = await Product.find({
        name: { $regex: regex },
    })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    res.status(200).json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
};
