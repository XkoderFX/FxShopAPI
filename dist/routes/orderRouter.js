"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = require("express");
var orderController_1 = require("../controllers/orderController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.Router();
exports.orderRouter = router;
router.route("/").post(authMiddleware_1.protect, orderController_1.addOrderItems).get(authMiddleware_1.protect, authMiddleware_1.admin, orderController_1.getOrders);
router.route("/myorders").get(authMiddleware_1.protect, orderController_1.getMyOrders);
router.route("/:id").get(authMiddleware_1.protect, orderController_1.getOrderById);
router.route("/:id/pay").patch(authMiddleware_1.protect, orderController_1.updateOrderToPaid);
router.route("/:id/deliver").patch(authMiddleware_1.protect, authMiddleware_1.admin, orderController_1.updateOrderToDelivered);
