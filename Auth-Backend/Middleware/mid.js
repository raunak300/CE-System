const jwt=require('jsonwebtoken')
const tokenmiddleware=(req,res,next)=>{
   try {
     const usertoken=req.cookies?.userCookie;
     if(!usertoken){
         return res.status(401).send({message:"token doest not exist"})
     }
 
     const decode=jwt.verify(usertoken,process.env.JWT_SIGN)
     req.userinfo=decode;
 
     next();
   } catch (error) {
        return res.status(403).send({message:error})
   }
}

module.exports=tokenmiddleware;