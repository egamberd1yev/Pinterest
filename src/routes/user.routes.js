import { Router } from "express";
import { createUsers } from "../controller/user.controller.js";

router.post("/create", createUsers)