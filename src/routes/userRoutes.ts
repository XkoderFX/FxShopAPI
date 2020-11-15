import { Router } from "express";
import {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    registerUser,
    updateUser,
    updateUserProfile,
} from "../controllers/userController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", authUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile);
router
    .route("/:id")
    .get(protect, admin, getUserById)
    .patch(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);
export { router as userRouter };
