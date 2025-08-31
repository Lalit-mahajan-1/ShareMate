import { Schema, model } from "mongoose";
const userSchema = new Schema({
    UserId:{
    type:String,
    ref:'Users'
  },
   ProfURL: {
    type: String,
    default:"https://res.cloudinary.com/dd7ceanme/image/upload/v1756621054/UserImage_xz4yeg.png",
  },

}, { timestamps: true });

const UserImage = model("Userimage", userSchema);
export default UserImage;