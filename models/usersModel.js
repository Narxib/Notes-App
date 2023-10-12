import { Schema, model} from "mongoose"
import { Types } from 'mongoose'
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

export const User = model("Users", userSchema) 