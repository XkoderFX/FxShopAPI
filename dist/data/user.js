"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var pass = bcryptjs_1.default.hashSync("123456", 12);
var users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: pass,
        isAdmin: true,
    },
    {
        name: "Kober bort",
        email: "kfak@gmail.com",
        password: pass,
    },
    {
        name: "Jayson son",
        email: "admin@gmail.com",
        password: pass,
    },
];
exports.default = users;
