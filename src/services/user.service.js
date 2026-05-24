import * as userRepo from "../repositories/user.repo.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const sanitizeUser = (user) => {
	const userObject = user.toObject ? user.toObject() : user
	delete userObject.password

	return userObject
}


export const createUser = async (data) => {
  const {username, email, password} = data

  const existingUser = await userRepo.findUserByUsername(email)
  
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

export const login = async ({username, password}) => {
  const user = await userRepo.findUserByUsername(username) 

  if (!user) throw new Error("Invalid credentials")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Incorrect password") 

  const accesToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  await userRepo.updateUser(user.id, { refreshToken }) 

  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, accesToken, refreshToken }
}

export const register = async (data) => {
  const {username, email, password, role} = data

  const existingUser = await userRepo.findUserByEmail(email)
  if (existingUser) {
    const error = new Error("User already exists")
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userRepo.createUser({
    username,
    email,
    password: hashedPassword,
    role
  })

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  )

  const refreshToken = jwt.sign(
    { id: user.id},
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  )

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken
  }
}

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role},
    process.env.JWT_SECRET,
    { expiresIn: "1d"}
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role},
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "15d"}
  )
}