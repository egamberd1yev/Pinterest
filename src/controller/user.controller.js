import * as userService from "../services/user.service.js"

export const createUsers = async (req, res, next) => {
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