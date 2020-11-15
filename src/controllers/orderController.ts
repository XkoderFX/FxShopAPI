import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import ServerError from "./ServerError";
import { UserRouterRequest } from "./userController";

export const addOrderItems = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = ((req as unknown) as UserRouterRequest).user._id;

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length == 0) {
        const Error = new ServerError("no order items", 400);
        next(Error);
        return;
    } else {
        const order = new Order({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
};

export const getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (order) {
            res.status(200).json(order);
        } else {
            const error = new ServerError("Order not found", 404);
            throw error;
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

export const updateOrderToPaid = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.set("isPaid", true);
            order.set("paidAt", Date.now());
            order.set("paymentResult", {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            });
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            const error = new ServerError("Order not found", 404);
            throw error;
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateOrderToDelivered = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.set("isDelivered", true);
            order.set("deliveredAt", Date.now());
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            const error = new ServerError("Order not found", 404);
            throw error;
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const orders = await Order.find({ user: user._id });
    res.status(200).json(orders);
};

export const getOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
};
