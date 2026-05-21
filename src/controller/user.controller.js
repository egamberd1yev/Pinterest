import * as userService from "../service/user.service.js"

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}