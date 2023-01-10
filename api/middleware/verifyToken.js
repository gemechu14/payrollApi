const jwt = require('jsonwebtoken');
const createError = require('../utils/error.js');

exports.verifyToken = (req, res, next) => {
  if (
    req.headers.authorization
  ) {
    token = req.headers.authorization;
  } else if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }
  //
  if (!token) {
    return next(createError.createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_CODE, (err, user) => {
    if (err) return next(createError.createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  const verifyToken = require('./verifyToken.js');
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};
