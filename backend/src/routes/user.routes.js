import { Router } from "express";
import { createUser, login, register,getMe } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
// import { register } from "../services/user.service.js";

const router = Router()

router.post("/create", createUser)
router.post("/login", login)
router.post("/register", register)
router.get("/me", authMiddleware, getMe)
export default router