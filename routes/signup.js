import {Router} from "express"
import passport from "passport"
import {signupController} from "../controllers/signup.js"

export const signupRouter = Router()

signupRouter.get("/",signupController.renderSignUp)
signupRouter.post("/",passport.authenticate("local-signup",{
    successRedirect:"/notes",
    failureRedirect:"/signup",
    passReqToCallback:true
}))