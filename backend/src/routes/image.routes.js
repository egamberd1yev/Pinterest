import { Router } from "express"
import {
   uploadImage, 
   getAllImages,
   getImageById,
   deleteImage,
   getMyImages, 
   downloadImage} from "../controller/image.controller.js"
import { upload } from "../middleware/upload.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/upload", authMiddleware, upload.single("image"), uploadImage)
router.get("/my", authMiddleware, getMyImages)
router.get("/:id/download", downloadImage)
router.get("/", authMiddleware, getAllImages)
router.get("/:id", getImageById)
router.delete("/:id", deleteImage)
export default router   