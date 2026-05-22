import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.js";
import { UserEntity } from "../models/user.entity.js";

const getRepository = () => AppDataSource.getRepository(UserEntity)

export const findUserByEmail = async (email) => {
	const userRepository = getUserRepository()

	return userRepo.findOne({
		where: { email: email.toLowerCase() },
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