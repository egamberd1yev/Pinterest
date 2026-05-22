import { Router } from "express"
import {
   uploadImage, 
   getAllImages,
   getImageById,
   deleteImage } from "../controller/image.controller.js"
import { upload } from "../middleware/upload.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js" // ← qo'shildi

const router = Router()

router.post("/upload", authMiddleware, upload.single("image"), uploadImage) // ← authMiddleware qo'shildi
router.get("/", getAllImages)
router.get("/:id", getImageById)
router.delete("/:id", deleteImage)

export default router