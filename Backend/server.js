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
dotenv.config({quiet:true});

app.use(bodyparser.json());
app.use(cors({
  origin: function (origin, callback) {
    console.log('Request origin:', origin); 
 
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.LOCAL_URL,
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174', 
    ].filter(Boolean); 
    
    console.log('Allowed origins:', allowedOrigins); 
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(null, true); 
    
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

app.options('*', cors());

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});
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

