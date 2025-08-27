import express from 'express';
import bodyparser from "body-parser"
import cors from "cors"
import mongoose from 'mongoose';
import noteroutes from "./routes/Notes.js"
import userroutes from "./routes/User.js"
import historyroutes from "./routes/Noteshistory.js"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import requireAuth from './middleware/auth.js'
import User from './model/usermodel.js';
const app = express()
app.use(bodyparser.json());
dotenv.config({quiet:true});
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser())
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use('/images', express.static('public/images'));
app.use("/Notes",requireAuth,noteroutes)
app.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ name:user.name,id: req.userId, email: user.email,UserBrowser:req.headers['user-agent'],Date:new Date().toDateString()});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

app.get("/isLogedIn",requireAuth,async(req,res)=>{
  try{
   const user = await User.findById(req.userId);
   const isLogedIn = user?true:false;
   res.json({isLogedIn});
  }
  catch(err){
    res.status(500).json({ error: "Failed to fetch user info" });
  }
})
app.use("/user",userroutes)
app.use("/History",historyroutes)

