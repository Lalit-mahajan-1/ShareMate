import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "Minimum password length is 6 characters"],
  },
  googleId:{
    type:String,unique:true,sparse:true
  },
}, { timestamps: true });



//Hooks
userSchema.pre('save',async function(next){
  if(this.password){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  }
  next();
})

userSchema.statics.login = async function (email,password) {
  const user = await this.findOne({email});
  if(user){
   const auth = await bcrypt.compare(password,user.password);
   if(auth){
    return user;
   }
   throw Error("Incorrect Password")
  }
  throw Error ("Incorrect Email")
}

const User = model("User", userSchema);
export default User;