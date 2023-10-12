import { Note } from "../../models/notesModel.js"
import { Types } from 'mongoose';

const { ObjectId } = Types;

export class notesApiControllers{

    static async getAllNotes(req,res){
        Note.find({}).then((result)=>{
            res.json(result)
        })
    }

    static async getById(req,res){
        const {id} = await req.params

       Note.findById({_id: new ObjectId(id)})
       .then((result)=>res.json(result))
    }

    static async newNote(req,res){
        const {title,content,author} = await req.body
        const date = Date.now()
        const newNote = new Note({
            _id: new ObjectId,
            title,
            content,
            creation_date:date,
            last_updated:date,
            author
        })
        console.log(newNote)
        newNote.save()
        .then(result=>{
            console.log("Note created")
            res.json(result)
        })
        .catch(error=>{
            res.json({message:"Could not create note",error})
        })
    }
    static async updateNote(req,res){
        const {id} = req.params
        const {title,content,creation_date,author} = req.body
        const date = Date.now()
        const updated_Note = new Note ({
            title,
            content,
            last_updated:date,
            author
        })
        Note.findByIdAndUpdate(new ObjectId(id),updated_Note,{new:true}).then((result)=>{
            console.log("Note updated",result)
            res.json(result)
        })
    }

    static async deleteNote(req,res){
        const {id} = req.params
        Note.findByIdAndDelete(new ObjectId(id)).then(()=>{
            console.log("Note deleted")
            res.redirect("/notes")
    })
    }
}