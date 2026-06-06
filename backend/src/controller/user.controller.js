import * as userService from "../services/user.service.js"

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body)
    res.status(201).json(result)
  }catch (error) {
    next(error)
  }
}

export const getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}