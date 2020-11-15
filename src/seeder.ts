import mongoose from "mongoose";
import users from "./data/user";
import products from "./data/products";
import User from "./models/user";
import Product from "./models/product";
import Order from "./models/order";
import connectDB from "./config/db";

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        const createdUsers = await User.insertMany(users);
        const adminID = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminID };
        });
        await Product.insertMany(sampleProducts);
    } catch (error) {
        console.error(error);
    }
};
const destroyData = async () => {
    try {
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        console.log("Data Destroyed");
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
