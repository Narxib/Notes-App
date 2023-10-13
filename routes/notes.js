import { Router } from "express"
import { notesControllers } from "../controllers/notes.js"
import { isLoggedIn } from "../index.js"
export const notesRoutes = Router()

//GET ROUTES
notesRoutes.get("/",isLoggedIn, notesControllers.userNotes)
notesRoutes.get("/notes", notesControllers.renderAllNotes)
notesRoutes.get("/note/create_note",isLoggedIn, notesControllers.newNoteForm)
notesRoutes.get("/note/delete_note/:id",isLoggedIn,notesControllers.deleteNote)
notesRoutes.get("/note/update_note/:id",isLoggedIn,notesControllers.renderUpdateNote)
//POST ROUTES
notesRoutes.post("/note/create_note",isLoggedIn, notesControllers.createNote)
notesRoutes.post("/note/update_note/:id",isLoggedIn,notesControllers.updateNote)
//UPDATE ROUTES


//DELETE ROUTES