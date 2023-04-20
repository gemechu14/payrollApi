const Package = require("../models/Package.js");
const _ = require("underscore");
const vm = require("v-response");
const { createError } = require("../utils/error.js");
const User = require("../models/userModel.js");
const moment=require('moment')


exports.createPlan = async (req, res, next) => {
  try {

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


    const subscription = await Package.find();
   
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

     res.status(200).json(daysLeft);
  } catch (err) {
    res.status(404).json("error");
  }

}


exports.getSubscription = async (req, res, next) => {
  try {

    const subscription = await User.find({_id:req.params.id});
  

    if (subscription[0].packageId){

     
      const packageInfo = await Package.find({_id: subscription[0]?.packageId})
    res.status(200).json({
      package: subscription[0]?.packageId? subscription[0]?.packageId:'undifined',
     
      packageInfo
      ,
    });

  }
  else{

      res.status(200).json({
        package: subscription[0]?.packageId ? subscription[0]?.packageId : 'undifined',
        trial: subscription[0]?.isTrial
        ,
      });

  }
  } catch (e) {
    return res.status(500);
  }
};



exports.updateEmployeePackageSubscription = async (req, res, next) => {
 
  try {
    console.log('hello')

    const subscription = await User.findOneAndUpdate({ _id: req.params.id },
      
      {
        $set: { packageId: req.params.packageId },
      },
      { new: true, useFindAndModify: false }
      );
  
  

      res.status(200).json({
        subscription
        
      });
 
  } catch (e) {
   res.status(500).json("error");
  }
};



