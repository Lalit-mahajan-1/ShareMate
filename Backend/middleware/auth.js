import  jwt  from "jsonwebtoken";

 const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
       jwt.verify(token,process.env.SECRET,(error,decodeToken)=>{
        if(error){
            return res.status(401).json({ message: "Unauthorized" });
        }
        else{
            req.userId = decodeToken.id;
            next();
        }
       })
    }
    else{
       return res.status(401).json({ message: "No token provided" });
    }
}

export default requireAuth;
