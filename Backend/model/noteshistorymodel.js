import mongoose from "mongoose";

const NotesHistorySchema = new mongoose.Schema({
  UserId:{
    type:String,
    ref:'Users'
  },
   ImgURL: {
    type: String,
    required: true,
  },
   Date :{
    type: String,
    required:true,
   },
   Action :{
    type:String,
    required:true
   },
   title:{
    type: String,
    required:true,
   }
    
});

export default mongoose.model("NotesHistory", NotesHistorySchema);
