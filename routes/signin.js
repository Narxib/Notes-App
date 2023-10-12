import {Router}from "express"
import {signinController} from "../controllers/signin.js"
import passport from "passport"

export const signinRouter = Router()

signinRouter.get("/",signinController.renderSignin)
signinRouter.post("/", passport.authenticate("local-signin",{
    successRedirect:"/notes",
    failureRedirect:"/signin",
    passReqToCallback:true
}))