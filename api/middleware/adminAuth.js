const jwt=require('jsonwebtoken');

const createError = require('../utils/error.js');

const adminAuth = (req, res, next) => {
    const token=req.headers.authorization;
    console.log(token);
    if (!token) {
      return next(createError.createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT_CODE, (err, user) => {
      if (err) return next(createError.createError(403, "Token is not valid!"));
      req.user = user;
      
      if (req.user.isAdmin == true) {
        console.log(req.user.isAdmin==true);
        next();
      } else {
        console.log(req.user.isAdmin==true);
        return next(createError.createError(403,'You are not authorized  brother'));
      }
     
   })
  };
  module.exports=adminAuth;