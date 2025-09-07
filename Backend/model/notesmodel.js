import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  ImgURL: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true,
  },
  Notes: {
    type: String,
    required: true,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
  },
  theme:{
    type:String,
    default:'#fff'
  },
  visibility:{
    type:String,
    enum:['private','public'],
    default:'private'
  },
    visitHistory : [{timestamp:{type:Number}}]
});

export default mongoose.model("Notes", NotesSchema);
