import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    name: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const context = (this as unknown) as User;
    context.password = await bcrypt.hash(context.password, 12);
});

const User = mongoose.model("User", userSchema);
export default User;
