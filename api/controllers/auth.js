const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const createError = require('../utils/error.js');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    const { isAdmin, password, ...otherDetails } = newUser._doc;
    res.status(200).json({
      otherDetails,
    });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return createError.createError(
        404,
        'Please provide username and password'
      );
    }
    const user = await User.findOne({ username });
    if (!user) return next(createError.createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError.createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_CODE
    );
    console.log(token);

    const { isAdmin, ...otherDetails } = user._doc;

    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        _id: user._id,
      });
    //.json({ details: {...otherDetails}, isAdmin });
  } catch (err) {
    next(err);
  }
};
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
