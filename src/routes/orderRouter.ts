import { Router } from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} from "../controllers/orderController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").patch(protect, updateOrderToPaid);
router.route("/:id/deliver").patch(protect, admin, updateOrderToDelivered);
export { router as orderRouter };
