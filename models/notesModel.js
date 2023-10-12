import { Schema, model} from "mongoose"
import { Types } from 'mongoose';

const { ObjectId } = Types;

export const notesSchema = new Schema({
    _id: ObjectId,
    title: String,
    content: String,
    creation_date: Date,
    last_updated: Date,
    author: String
})

export const Note = model("Notes", notesSchema) 