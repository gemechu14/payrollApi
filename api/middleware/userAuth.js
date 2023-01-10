const jwt = require('jsonwebtoken');
const createError = require('../utils/error.js');
const userAuth = (req, res, next) => {
  //const token1 = req.cookies.access_token;

  const token = req.headers.authorization;
 const t1= req.cookies.jwt
  console.log(t1);
  if (!token) {
    return next(createError.createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_CODE, (err, user) => {
    if (err) return next(createError.createError(403, 'Token is not valid!'));
    req.user = user;

    if (req.user.id == req.params.id || req.user.isAdmin) {
      console.log(req.params.id == req.user.id);
      next();
    } else {
      console.log(user);
      return next(createError.createError(403, 'You are not authorized!'));
    }
  });
};
module.exports = userAuth;
