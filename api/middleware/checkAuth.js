const jwt=require('jsonwebtoken');
require('dotenv').config();

module.exports=(req,res,next)=>{
   

try {
    const token=req.headers.authorization;
    console.log(token);
    const decoded=jwt.verify(token,process.env.JWT_CODE);
    
    req.userData=decoded;
    next();
    
} catch (error) {
    return res.status(401).json({
        message:'Auth failed'
    })
    
}

}