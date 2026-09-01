import { Router } from "express"
import {register, login, getUserProfile, logout, updateProfile, updatePassword} from "../controllers/auth.controller.js"
import {isAuthenticatedUser} from "../middlewares/auth.middleware.js"
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getProfile", isAuthenticatedUser, getUserProfile);
router.put("/profile", isAuthenticatedUser, updateProfile);
router.post("/change-password", isAuthenticatedUser, updatePassword);

export default router;