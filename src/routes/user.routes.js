import { Router } from "express";
import { createUsers, login } from "../controller/user.controller.js";

const router = Router()

router.post("/create", createUsers)
router.post("/login", login)

export default router