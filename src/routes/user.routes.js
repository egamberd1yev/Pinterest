import { Router } from "express";
import { createUser, login, register } from "../controller/user.controller.js";
// import { register } from "../services/user.service.js";

const router = Router()

router.post("/create", createUser)
router.post("/login", login)
router.post("/register", register)

export default router