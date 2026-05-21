import { ILike } from "typeorm";
import { AppDataSource } from "../config/db";
import { UserEntity } from "../models/user.entity";

const getRepository = () => AppDataSource.getRepository(UserEntity)

export const createUser = async (userData) => {
  const userRepository = getRepository()

  const newUser = userRepository.create({
    ...userData,
    email: userData.email.toLowerCase(),
  })

  return userRepository.save(newUser)
}