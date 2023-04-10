const Package = require("../models/Package.js");
const _ = require("underscore");
const vm = require("v-response");
const { createError } = require("../utils/error.js");
const User = require("../models/userModel.js");
const moment=require('moment')


exports.createPlan = async (req, res, next) => {
  try {
    // if (!req.body.price || !req.body.name) {
    //     return res.status(400)
    //         .json(vm.ApiResponse(false, 400, 'all fields are required'))
    // }
    // const _expected_body = _.pick(req.body, ['price', 'name']);
    const create_plan = await Package(req.body);
    const save_plan = await create_plan.save();
    if (save_plan) {
      return res.status(200).json(save_plan);
    } else {
      return res
        .status(400)
        .json(
          vm.ApiResponse(
            false,
            400,
            "Oops! an error occurr,please try again later "
          )
        );
    }
  } catch (e) {
    return res.status(500);
  }
};

exports.listPlan = async (req, res, next) => {
  try {
    //  const sub=await Package.aggregate(
    //         [
    //            { $project: { no_of_Employee: { $concat: [ "$min_number_of_Emp", " - ", "$max_number_of_Emp" ] } } }
    //         ]
    //      )
    const subscription = await Package.find();
    // if (!subscription) {
    //     return next('error occured')
    // } else {
    res.status(200).json({
      count: subscription.length,
      subscription,
    });
  } catch (e) {
    return res.status(500);
  }
};

exports.updatePackage = async (req, res, next) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.packageId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (err) {
    next(createError(404, err));
  }
};

exports.deletePackage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const package = await Package.findByIdAndDelete(id);
    res.status(200).json(package);
  } catch (err) {
    res.status(404).json("error");
  }
};


exports.getleftDays=async(req,res,next)=>{

  try {
    const id = req.params.id;

    const package = await User.findById(id);
    const next_payment_date=package.next_payment_date;
    console.log(next_payment_date)


    const nextPaymentDate = moment(next_payment_date, 'DD/MM/YYYY');
    const currentDate = moment();
    const daysLeft = nextPaymentDate.diff(currentDate, 'days');

    //subscription.leftday = daysLeft;


    res.status(200).json(daysLeft);



  } catch (err) {
    res.status(404).json("error");
  }


}