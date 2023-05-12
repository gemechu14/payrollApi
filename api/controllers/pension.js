const Allowance = require('../models/Allowance.js');
const Employee = require('../models/employee.js');
const mongoose = require('mongoose');
const Pension=require('../models/pension.js')



exports.add_Pension = async (req, res) => {
    try {
        const {
         employeeContribution,
         employerContribution
        } = req.body;
        const checkPension=await Pension.find();
        if(checkPension.length==0){


            const newPension = await Pension.create({
                employeeContribution: employeeContribution,
                employerContribution: employerContribution,

            });

            res.status(200).json({
                message: 'Registered successfully',
                newPension
            });
        }
        else{
            res.status(409).json({
                message:"You cant add new pension instead use update option"
            })
        }
      

    } catch (err) {
        res.status(500).json("Something gonna wrong");
    }
};


// GET ALL
exports.get_All_pension = async (req, res, next) => {
   
    try {
        const pension = await Pension.find();
        res.status(200).json({ count: pension.length, pension });
    } catch (err) {
        next(err);
    }
};
// GET one
exports.get_single_Allowance = async (req, res) => {
    try {
        const allowance = await Allowance.findById({ companyId: req.user.id, _id: req.params.id });
        res.status(200).json(allowance);
    } catch (error) {
        res.status(404).json(error);
    }
};
// UPDATE
exports.updatePension1 = async (req, res) => {
    try {
        const updatedPension = await Pension.findByIdAndUpdate({
           
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            message:"updated successfully",
            updatedPension
}
            
            );
    } catch (error) {
        res.status(404).json(error)

    }
};




// DELETE Pension
exports.delete_pension = async (req, res) => {
   
    try {

        const checkPension=await Pension.findById(req.params.id);
        console.log(checkPension)
        if(checkPension.length!=0){
            await Pension.findByIdAndDelete(req.params.id);
            res.status(200).json("pension has been deleted.");
        }
        else{      

            res.status(404).json("There is no such file ");
        }
      
    } catch (err) {
        res.status(500).json("something gona wrong ");
    }
};


