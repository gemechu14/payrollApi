const Package = require("../models/Package.js");
const _ = require("underscore");
const vm = require("v-response");
const { createError } = require("../utils/error.js");
exports.createPlan = async (req, res, next) => {
    try {
        // if (!req.body.price || !req.body.name) {
        //     return res.status(400)
        //         .json(vm.ApiResponse(false, 400, 'all fields are required'))
        // }
       // const _expected_body = _.pick(req.body, ['price', 'name']);
        const create_plan = new Package(req.body);
        const save_plan = create_plan.save();
        if (save_plan) {
            return res.status(200)
                .json(vm.ApiResponse(true, 200, 'success', save_plan))
        } else {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, 'Oops! an error occurr,please try again later '))
        }
    } catch (e) {
        return res.status(500)
    }
};

exports.listPlan = async (req, res, next) => {
    try {
        const subscription = await Package.find();
        if (!subscription) {
            return next('error occured')
        } else {
            res.status(200).json({
                count: subscription.length,
                subscription,
              });
        }
    } catch (e) {
        return res.status(500)
    }
}

exports.updatePackage=async (req,res,next)=>{
    try {
        
    const updatedPackage = await Package.findByIdAndUpdate(
        req.params.packageId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPackage);
        
    } catch (err) {
        next(createError(404,err));
        
    }
}

exports.deletePackage=async (req,res,next)=>{

    try {
        const id=req.params.id;
        
        const package=await Package.findByIdAndDelete(id);
        res.status(200).json('deleted successfully')
    } catch (err) {
        res.status(404).json('error')
        
    }
}