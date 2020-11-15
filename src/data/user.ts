import bcrypt from "bcryptjs";

const pass = bcrypt.hashSync("123456", 12);

const users = [
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
export default users;
