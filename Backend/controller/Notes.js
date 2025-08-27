import Note from "../model/notesmodel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const create = async (req, res) => {
  try {
    const { Notes, theme } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "ShareMate",
      resource_type: "image",
      public_id: `${req.userId}_${req.file.originalname}_${Date.now()}`,
    });
    const ImgURL = result.secure_url;
    const newNotes = new Note({
      Notes,
      ImgURL,
      createdBy: req.userId,
      theme,
    });
    await newNotes.save();

    res.status(200).json({ message: "Upload success", newNotes });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const NotesData = await Note.find({ createdBy: id });
    if (!NotesData || NotesData.length == 0) {
      return res.status(404).json({ message: "User Data Not Found" });
    }
    res.status(200).json(NotesData);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const NotesExist = await Note.findById(id);
    if (!NotesExist) {
      return res.status(404).json({ message: "Note not found" });
    }
    let publicId = NotesExist.ImgURL.split("ShareMate/")[1]; 

    publicId = `ShareMate/${publicId.split(".")[0]}.${publicId.split(".")[1]}`; 
    await cloudinary.uploader
      .destroy(publicId)

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const UpdateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const NotesExist = await Note.findById(id);
    if (!NotesExist) {
      return res.status(404).json({ message: "Note not found" });
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const NotesCount = async (req, res) => {
  try {
    const id = req.params.id;
    const NotesData = await Note.find({ createdBy: id });
    res.status(200).json(NotesData);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};
