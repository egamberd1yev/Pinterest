import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.js";
import { UserEntity } from "../models/user.entity.js";

const getRepository = () => AppDataSource.getRepository(UserEntity)

export const findUserByUsername = async (username) => {
	const userRepo = getRepository()

	return userRepo.findOne({
		where: { username: username },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true
    }
	})
}

export const createUser = async (userData) => {
  const userRepo = getRepository()

  const newUser = userRepo.create({
    ...userData,
    email: userData.email.toLowerCase(),
  })

  return userRepo.save(newUser)
}

export const updateUser = async (id, data) => {
  const userRepo = getRepository()
  return userRepo.update(id, data)
}