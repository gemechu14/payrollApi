const User = require('../models/userModel.js');
const { createError } = require('../utils/error.js');
const { calculateNextPayment } = require('../utils/Helper.js');
const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const mongoose = require('mongoose');
const Package = require('../models/Package.js');
// const moment = require('moment');
const moment = require('moment');

exports.trialSubscription = async (req, res, next) => {
  try {
    const email = req.body.email;
    const company = await User.findOne({ email });
    console.log(company);
    if (!company) {
      return next(
        createError(404, 'There is no company registed with this email')
      );
    }
    //console.log(await User.find());
    if (company.isActive) {
      res.status(201).json({
        status: false,
        message:
          'You have already finished your Trial period please subscribe another package',
      });
    } else {
      let nextpaymentDate;
      date = Date.now();
      nextpaymentDate = await calculateNextPayment('Trial', date);

      const isTrial = await User.findOneAndUpdate(
        { email },
        { $set: { isTrial: 'true', next_payment_date: nextpaymentDate } },
        { new: true }
      );
      //   company.next_payment_date = nextpaymentDate;
      res.status(200).json(company.next_payment_date);
    }
    // return next(createError(404,'you have already finished your Trial period please subscribe another package'))
  } catch (error) {
    return next(createError(404, error));
  }
};

exports.protect = async (req, res, next) => {
  try {
    //getting token check if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token || token === 'expiredtoken') {
      return res.status(401).json({
        message: 'You are not logged in, please log in to get access',
      });
    }
    //console.log(process.env.JWT_CODE);
    //verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_CODE);
    console.log(decoded);
    //check if user still exists
    const currentUser = await User.findById(decoded.id);
    //    console.log(currentUser);
    if (!currentUser) {
      return res.status(401).json({ message: 'user does not longer exists' });
    }
    //check if user change password after jwt was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        message: 'user recently changed password! please log in again.',
      });
    }
    //grant access to protected route
    req.user = currentUser;
    //console.log(currentUser);
    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.packageSubscription = async (req, res, next) => {
  try {
    const packageId = req.params.packageId;
    const packageInfo = await Package.findOne({ _id: packageId });
    const packageType=packageInfo.name;
    console.log(packageInfo.name);
    let nextpaymentDate;
    let date = Date.now();

    nextpaymentDate = await calculateNextPayment(packageType, date);

    const startDate = moment(date);

    mongoose.Types.ObjectId.isValid(req.user.id);
    const user = await User.findById(req.user.id).select('+password');
    
    const id = req.user.id;
    console.log(user.isTrial);
    const savedPackage = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          packageId: packageId,
          next_payment_date: nextpaymentDate,
          startDate: startDate,
        },
      },
      { new: true }
    );
    res.status(200).json(savedPackage);
  } catch (err) {
    next(createError(404, err));
  }
};
