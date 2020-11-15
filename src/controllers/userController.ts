import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import mongoose from "mongoose";
import ServerError from "./ServerError";
import generateToken from "../util/generateToken";
import users from "../data/user";

export interface UserRouterRequest extends Request {
    user: any;
}

export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const user: any = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            const error = new ServerError("email or password is invalid", 401);
            next(error);
        }
    } catch (Error) {
        console.log(Error);
        const error = new ServerError(Error.message, 500);
        next(error);
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;
    try {
        const doesUserExist = await User.findOne({ email });

        if (doesUserExist) {
            const error = new ServerError("user already exists", 401);
            throw error;
        }

        const user: any = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                password: user.password,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            const error = new ServerError("invalid data", 400);
            throw error;
        }
    } catch (Error) {
        const error = new ServerError(Error.message, Error.statusCode || 500);
        next(error);
    }
};

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req as UserRouterRequest;
    const user: any = await User.findById(request.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
        });
    } else {
        const error: ServerError = new ServerError("User not found", 404);
        next(error);
    }
};

export const updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const request = req as UserRouterRequest;
    const user: any = await User.findById(request.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        const error: ServerError = new ServerError("User not found", 404);
        next(error);
    }
};

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const users = await User.find({});
    res.status(200).json(users);
};

// @desc    Delete a user
// @route   DELETE /api/users/:_id
// @access  Private/Admin
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const users = await User.findByIdAndRemove(id);
    res.status(201).json({ message: "User has been deleted successfully" });
};

// @desc    Get user by ID
// @route   GET /api/users/:_id
// @access  Private/Admin
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
        res.status(200).json(user);
    } else {
        const error = new ServerError("user not found", 404);
        next(error);
    }
};

// @desc    update a user by ID
// @route   PATCH /api/users/:_id
// @access  Private/Admin
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user: any = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        const error: ServerError = new ServerError("User not found", 404);
        next(error);
    }
};
