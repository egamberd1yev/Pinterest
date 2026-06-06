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
  const imageRepo = getImageRepository();

  return await imageRepo.delete(id);
};

export const findImagesByUserId = async (userId) => {
  const imageRepo = getImageRepository()
  return imageRepo.find({
    where: { user: { id: userId } },
    relations: { user: true }
  })
}