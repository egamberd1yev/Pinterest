import * as imageRepo from "../repositories/image.repo.js"
import fs from "fs"

export const uploadImage = async (file, body, userId) => { // ← body qo'shildi
  if (!file) {
    const error = new Error("Fayl yuklanmadi")
    error.statusCode = 400
    throw error
  }

  const image = await imageRepo.saveImage({
    title: body.title,
    description: body.description || "",
    tags: body.tags ? body.tags.split(",") : [],
    filename: file.filename,
    filepath: file.path,
    mimetype: file.mimetype,
    size: file.size,
    user: { id: userId }
  })

  return image
}
export const getAllImages = async () => {
  return imageRepo.findAllImages()
}

export const getImageById = async (id) => {
  const image = await imageRepo.findImageById(id)
  if (!image) {
    const error = new Error("Rasm topilmadi")
    error.statusCode = 404
    throw error
  }
  return image
}

export const deleteImage = async (id) => {
  const image = await imageRepo.findImageById(id)
  if (!image) {
    const error = new Error("Rasm topilmadi")
    error.statusCode = 404
    throw error
  }

  // Faylni diskdan o'chirish
  fs.unlinkSync(image.filepath)

  return imageRepo.deleteImage(id)
}
