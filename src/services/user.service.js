import * as userRepo from "../repositories/user.repo.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const createUser = async (data) => {
  const {username, email, password} = data

  const existingUser = await userRepo.findUserByEmail(email)
  
  if (existingUser) {
    const error = new Error("Email already exists")
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userRepo.createUser({
    username,
    email,
    password: hashedPassword
  })
  
  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword }
}