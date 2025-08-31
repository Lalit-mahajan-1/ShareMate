import express from "express";
const route = express.Router();
import UserImage from "../model/userimage.js";

route.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await UserImage.findOne({ UserId: id });

    if (!image) {
      return res.status(404).json("https://res.cloudinary.com/dd7ceanme/image/upload/v1756621054/UserImage_xz4yeg.png");
    }
    res.status(200).json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

route.put("/:id", async (req, res) => {
  const { UserId, ProfURL } = req.body;
  const updateImage = await UserImage.findOneAndUpdate(
    { UserId: UserId },  
    { ProfURL },
    { new: true, upsert: true } 
  );

  res.status(200).json(updateImage);
});

export default route;
