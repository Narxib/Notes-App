import {Router} from "express"
import { usersController } from "../controllers/users.js"
import { isLoggedIn } from "../index.js"

export const usersRouter = Router()


usersRouter.get("/profile",isLoggedIn ,usersController.userProfile)