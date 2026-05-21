import * as userRepository from "../repositories/user.repo.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"


export const createUsers = async (data) => {
  const {username, email, password} = data

  const existingUser = await userRepository.findUserByEmail(email)
  
  if (existingUser) {
    const error = new Error("Email already exists")
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userRepository.createUser({
    username,
    email,
    password: hashedPassword
  })

  return sanitizeUser(user)
}

