import { Router } from "express";
import {
    createProduct,
    createReview,
    deleteProduct,
    getProduct,
    getProducts,
    getTopProducts,
    updateProduct,
} from "../controllers/productController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = Router();

// @routes api/products

router.route("/top").get(getTopProducts);

router
    .route("/:id")
    .get(getProduct)
    .delete(protect, admin, deleteProduct)
    .patch(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createReview);

router.route("/").get(getProducts).post(protect, admin, createProduct);

export { router as productRouter };
