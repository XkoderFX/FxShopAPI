import jwt from "jsonwebtoken";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import ServerError from "../controllers/ServerError";
import { UserRouterRequest } from "../controllers/userController";

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];

        try {
            const decoded: { [key: string]: string } = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as { [key: string]: string };
            (req as UserRouterRequest).user = await User.findById(
                decoded.id
            ).select("-password");
            next();
        } catch {
            const error: ServerError = new ServerError(
                "Not authorized, token failed",
                401
            );
            next(error);
        }
    }

    if (!token) {
        const error: ServerError = new ServerError(
            "Not authorized, no token",
            401
        );
        next(error);
    }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user && user.isAdmin) {
        next();
    } else {
        const error: ServerError = new ServerError(
            "Not authorized as admin",
            401
        );
        next(error);
    }
};
