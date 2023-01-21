const User = require('../models/userModel.js');
const { createError } = require('../utils/error.js');
const {calculateNextPayment} =require('../utils/Helper.js')
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
        let date = Date.now();
        nextpaymentDate = await calculateNextPayment('Trial', date);

        const isTrial = await User.findOneAndUpdate(
        { email },
        { $set: { isTrial: 'true',next_payment_date:nextpaymentDate} },
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
