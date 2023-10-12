import { Router } from "express"
import { notesApiControllers } from "../../controllers/API/notesAPI.js"

export const notesApiRoutes = Router()
 //GET ROUTES
notesApiRoutes.get("/notes",notesApiControllers.getAllNotes)
notesApiRoutes.get("/note/:id",notesApiControllers.getById)
//POST ROUTES
notesApiRoutes.post("/note",notesApiControllers.newNote)
//PUT ROUTES
notesApiRoutes.put("/note/:id",notesApiControllers.updateNote)
//DELETE ROUTES
notesApiRoutes.delete("/note/:id",notesApiControllers.deleteNote)