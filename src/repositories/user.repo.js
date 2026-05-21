import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.js";
import { UserEntity } from "../models/user.entity.js";

const getRepository = () => AppDataSource.getRepository(UserEntity)

export const findUserByEmail = async (email) => {
	const userRepository = getRepository()

	return userRepository.findOne({
		where: { email: email.toLowerCase() },
	})
}

export const createUser = async (userData) => {
  const userRepository = getRepository()

  const newUser = userRepository.create({
    ...userData,
    email: userData.email.toLowerCase(),
  })

  return userRepository.save(newUser)
}