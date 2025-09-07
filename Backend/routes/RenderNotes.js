import express from "express";
import notes from "../model/notesmodel.js";
import User from "../model/usermodel.js";
import UserImage from "../model/userimage.js";
const route = express.Router();

route.get('/:userid/:notesid', async(req,res)=>{
    const userid = req.params.userid
    const notesid = req.params.notesid
    const note = await notes.find({_id:notesid});
    const user = await User.find({_id:userid})
    const userImage = await UserImage.findOne({UserId:userid})

    res.status(200).json({note,Name:user[0].name,ProfileImage:userImage.ProfURL})
})

route.put('/Changevisibility/:noteid', async(req,res)=>{
          const notesid = req.params.noteid;
          const {Visibility}  = req.body
          try{
              const updatedNote = await notes.findByIdAndUpdate(notesid, {visibility:Visibility } , {
                    new: true,
                    runValidators: true,
                  });
           res.status(200).json(updatedNote)
          }
          catch(error){
            res.status(500).json({ errorMessage: error.message });
          }

})

route.get('/publicnotes', async (req, res) => {
  try {
    const Notes = await notes.find({ visibility: 'public' })
      .populate({
        path: "createdBy",
        select: "name",
      })
      .lean(); 

    if (!Notes || Notes.length === 0) {
      return res.status(404).json({ message: "No public notes found" });
    }

    const finalResponse = await Promise.all(
      Notes.map(async (note) => {
        const userImg = await UserImage.findOne({ UserId: note.createdBy._id });
        return {
          ...note,
          user: {
            name: note.createdBy.name,
            profileImg: userImg?.ProfURL || "https://res.cloudinary.com/dd7ceanme/image/upload/v1756621054/UserImage_xz4yeg.png"
          }
        };
      })
    );

    res.status(200).json(finalResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


export default route;