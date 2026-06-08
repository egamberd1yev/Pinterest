import * as imageService from "../services/image.service.js"
import path from "path"

export const uploadImage = async (req, res, next) => {
  try {
    const image = await imageService.uploadImage(req.file, req.user.id, req.body)
    res.status(201).json(image)
  }catch (error) {
    next (error)
  }
}

export const getAllImages = async (req, res, next) => {
  try {
    //bu yerga ham search uchun qo'shimcha qo'shildi
    const keyword = req.query.search;
    const images = await imageService.getAllImages(keyword)
    res.json(images)
  } catch (error) {
    next(error)
  }
}

export const getImageById = async (req, res, next) => {
  try {
    const image = await imageService.getImageById(req.params.id)
    res.json(image)
  } catch (error) {
    next(error)
  }
}

export const deleteImage = async (req, res, next) => {
  try {
    await imageService.deleteImage(req.params.id)
    res.json({ message: "Rasm o'chirildi" })
  } catch (error) {
    next(error)
  }
}

export const getMyImages = async (req, res, next) => {
  try {
    const images = await imageService.getMyImages(req.user.id)
    res.json(images)
  } catch (error) {
    next(error)
  }
}

export const downloadImage = async (req, res, next) => {
  try {
    const image = await imageService.getImageById(req.params.id)
    const absolutePath = path.resolve(image.filepath)
    res.download(absolutePath, image.filename)
  } catch (error) {
    next(error)
  }
}