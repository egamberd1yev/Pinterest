import { Router } from "express";
import { createUsers } from "../controller/user.controller.js";

const router = Router()

router.post("/create", createUsers)

export default router