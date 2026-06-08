import * as imageRepo from "../repositories/image.repo.js"
import fs from "fs"
import path from "path"

export const uploadImage = async (file,userId,body) => {
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
    filepath: `uploads/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size,
    user: { id: userId }
  })

  return image
}

//bu yerga ham search uchun funktsiya yangilandi
export const getAllImages = async (keyword) => {
  if (keyword) {
    return await imageRepo.searchImageInDb(keyword);
  }
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

  // 2. Loyihaning asosiy papkasidan turib uploads ichidagi rasmga aniq yo'l quramiz
  // Bu kod hamma operatsion tizimda (Windows, Mac) aniq manzilni hisoblab beradi
  const absolutePath = path.resolve(image.filepath);

  // 3. Endi tekshiramiz va o'chiramiz
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
    console.log("Rasm diskdan muvaffaqiyatli o'chirildi! 🚀");
  } else {
    console.warn(`Ogohlantirish: Fayl topilmadi, baribir bazadan o'chadi: ${absolutePath}`);
  }

  return imageRepo.deleteImage(id);
};

export const getMyImages = async (userId) => {
  return imageRepo.findImagesByUserId(userId)
}