import { AppDataSource } from "../config/db.js";
import { ImageEntity } from "../models/image.entity.js";

const getImageRepository = () => AppDataSource.getRepository(ImageEntity)

export const saveImage = async (imageData) => {
  const imageRepo = getImageRepository()
  const image = imageRepo.create(imageData)
  return imageRepo.save(image)
}

export const findAllImages = async () => {
  const imageRepo = getImageRepository()
  return imageRepo.find({ relations: { user: true } })
}

export const findImageById = async (id) => {
  const imageRepo = getImageRepository()
  return imageRepo.findOne({  
    where: { id },
    relations: { user: true }
  })
}

export const deleteImage = async (id) => {
  const imageRepo = getImageRepository()

  if (!image) {
    const error = new Error("Rasm topilmadi")
    error.statusCode = 404
    throw error
  }

  return imageRepo.delete(id)
}