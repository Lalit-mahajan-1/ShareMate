import noteshistorymodel from "../model/noteshistorymodel.js";

export const create = async(req,res) =>{
      const {UserId,ImgURL,Action} = req.body;
      try{
        const newHistory = new noteshistorymodel({UserId,ImgURL,Action,Date:new Date().toLocaleString()})
        await newHistory.save();
        res.status(201).json({message:"History Updated"})                                   
    }
      catch(error){
        res.status(500).json({message:"failed to Upload History"})
      }
}

export const getHistory = async(req,res) =>{
    const id = req.params.id;
    try{
          const data = await noteshistorymodel.find({UserId:id})
          if(!data || data.length ==0){
            return res.status(404).json({message:"History Not Found"});
         }
         res.status(200).json(data);
    }
    catch(error){
       res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
