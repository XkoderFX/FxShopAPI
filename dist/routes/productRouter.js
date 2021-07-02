"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = require("express");
var productController_1 = require("../controllers/productController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.Router();
exports.productRouter = router;
// @routes api/products
router.route("/top").get(productController_1.getTopProducts);
router
    .route("/:id")
    .get(productController_1.getProduct)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.deleteProduct)
    .patch(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.updateProduct);
router.route("/:id/reviews").post(authMiddleware_1.protect, productController_1.createReview);
router.route("/").get(productController_1.getProducts).post(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.createProduct);
