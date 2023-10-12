import {Router} from "express"
import {logoutController} from "../controllers/logout.js"

export const logoutRouter = Router()

logoutRouter.get("/", logoutController.getOut)