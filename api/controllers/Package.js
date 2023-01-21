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
        const find_plan = await Package.find({});
        if (!find_plan) {
            return res.status(400)
                .json(vm.ApiResponse(true, 400, 'Oops! an error occur'))
        } else {
            return res.status(200)
                .json(vm.ApiResponse(true, 200, 'Success', find_plan))
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