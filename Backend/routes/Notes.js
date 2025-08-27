import express from "express";
import multer from 'multer'
const route = express.Router();

import {
    create,
    getAllNotes,
    deleteNote,
    UpdateNote,
    NotesCount
} from "../controller/Notes.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } 
});

route.post('/upload', upload.single('file'),create)
route.get("/AllNotes/:id",getAllNotes)
route.delete("/Delete/:id",deleteNote)
route.put("/update/:id",UpdateNote)
route.get("/NoteCount/:id",NotesCount)
export default route;