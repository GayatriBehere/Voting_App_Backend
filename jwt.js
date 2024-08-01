const jwt=require('jsonwebtoken')

const jwtAuthMiddleware=(req,res,next)=>{
    //extract jwt token from the request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unathorized'});
    
    try {
        //verify jwt token
       const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Invalid token'});
    }

 
}

const generatetoken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)

}
module.exports={jwtAuthMiddleware,generatetoken}