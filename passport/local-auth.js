import "../databases/users.js"

import {User} from "../models/usersModel.js"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { Types } from 'mongoose';

const { ObjectId } = Types;

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null, user)
})


passport.use("local-signup", new LocalStrategy({
    usernameField:"email",
    passwordField: "password",
    passReqToCallback:true
},async (req,email, password, done)=>{
    
    const verify = await User.findOne({email:email})

    if(verify){
        console.error("Email already in use")
        return done(null, false, req.flash("signupMessage","Email already in use"))
    }
    else{
        const newUser = new User()
            newUser.email= email;
            newUser.password= await newUser.encryptPassword(password)
            newUser.save()
            done(null,newUser)
        }
    }))

passport.use("local-signin",new LocalStrategy({
    usernameField:"email",
    passwordField: "password",
    passReqToCallback:true
},async(req,email,password,done)=>{
    const user = await User.findOne({email:email})
    if(!user){
        console.log("//////////// UNKNOWN USER ////////////////")
        return done(null,false,req.flash("signinMessage","There's no account with this email "))
    }else{
        if(!user.comparePassword(password)){
            console.log("//////////// INCORRECT PASSWORD ////////////")
            return done(null,false, req.flash("signinMessage","Incorrect password"))
        }
        done(null,user)
}}))