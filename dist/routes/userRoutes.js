"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.Router();
exports.userRouter = router;
router.post("/login", userController_1.authUser);
router.route("/").post(userController_1.registerUser).get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUsers);
router
    .route("/profile")
    .get(authMiddleware_1.protect, userController_1.getUserProfile)
    .patch(authMiddleware_1.protect, userController_1.updateUserProfile);
router
    .route("/:id")
    .get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUserById)
    .patch(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.updateUser)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.deleteUser);
