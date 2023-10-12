import "../databases/mongodb.js"
import { Note } from "../models/notesModel.js"
import { Mongoose, Types } from 'mongoose';

const { ObjectId } = Types;

export class notesControllers{
    static async landing(req,res){
        const {id,email,pass}=req.user
        console.log(email)
        const notes = await Note.find({author:email})
        console.log(notes)
        res.render("userNotes",{data:notes,user:email})
    }

    static async renderAllNotes(req,res){
        
        const notes = await Note.find({})
        if(req.user){
            const {id,email, pass} = req.user
            console.log("User logged")
            res.render("notes",{data:notes, user:email})
        }else{

            res.render("notes",{data:notes})
        }
        
    }

    static async newNoteForm(req,res){
        res.render("create_note")    
    }

    static async createNote(req,res){
        const {title,content} = req.body
        const {id,email,pass} = req.user
        const date = Date.now()
        const newNote = new Note({
            _id: new ObjectId,
            title,
            content,
            creation_date:date,
            last_updated:date,
            author:email
        })
        newNote.save()
        .then((result)=>{
            console.log("Note created",result)
            req.flash("createNoteMessage","Note created0 ")
            res.redirect("../userNotes")
        })
    }

    static async deleteNote(req,res){
        const {id} = req.params
        Note.findByIdAndDelete(id)
        .then((result)=>{
            console.log(`Note deleted: ${id}`,result)
            res.redirect("../../notes")
        })
    }

    static async renderUpdateNote(req,res){
        const {id} = req.params
        const {userid,email,pass}=req.user
        Note.findOne({_id:id}).then((result)=>{
            res.render("update_note",{note:result,user:email})
        })
    }

    static async updateNote(req,res){
        console.log("REACHED")
        const {id}= req.params
        const {title,content}=req.body
        const last_updated = new Date() 

        Note.findByIdAndUpdate(id,{
            title,
            content,
            last_updated
        },{new:true})
        .then((result)=>{
            console.log("Note updated", result)
            res.redirect("../../notes")
        })
    }

}