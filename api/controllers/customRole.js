const CustomRole = require("../models/customRole.js");
//const Deduction=require('../models/deduction.js');
const Employee = require("../models/employee.js");
const mongoose = require("mongoose");
const createError = require("../utils/error.js");


//GET ALL
exports.get_All_Role = async (req, res, next) => {
    const failed = true;

    try {
        const customRole = await CustomRole.find({companyId:req.user.id});
        res.status(200).json({
            count: customRole.length,
            customRole,
        });
    } catch (err) {
        next(createError.createError(404, err));
    }
};

//GET one
exports.get_one = async (req, res) => {
    try {
        const deduction = await CustomRole.findById(req.params.id);


        res.status(200).json(deduction);
    } catch (error) {
        res.status(500).json(error);
    }
};
//UPDATE
exports.updateDeduction = async (req, res) => {
    try {
        const updatedDeduction = await Deduction.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedDeduction);
    } catch (error) { }
};


///////////////
exports.add_new_Role = async (req, res) => {
    try {
        const { name, permissions, employees } = req.body;

        
        const role1 = new CustomRole({
            name,
            permissions: permissions,
            companyId: req.user.id,
        });

        // Save the new role document to the database
       const savedRole = await role1.save();

      res.status(200).json(savedRole)


    } catch (err) {
        res.status(404).json({
            error: err,
        });
    }
};



//DELETE DEDUCTION
exports.delete_Role = async (req, res) => {
    const roleId = req.params.roleId;
    try {
        const role=await CustomRole.find({companyId:req.user.id,_id:roleId});
        console.log(role.length)

        if(role.length!=0){
            await CustomRole.findByIdAndDelete(req.params.roleId);

            res.status(200).json("Role has been deleted.");

        }else{
            res.status(404).json('There is  no such Role ')
        }
       
    } catch (err) {
        next(err);
    }
};

exports.Update_DE = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const newDeduction = new Deduction(req.body);
    try {
        const savedDeduction = await newDeduction.save();
        try {
            await Employee.findByIdAndUpdate(
                employeeId,
                {
                    $push: { deduction: req.body.id },
                },
                { new: true, useFindAndModify: false }
            );
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedDeduction);
    } catch (err) {
        next(err);
    }
};

//DELETE Allowances
exports.delete_Allowances = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {

        const deduction = await Deduction.find({ companyId: req.user.id, _id: req.params.id })

        if (deduction.length != 0) {

            await Deduction.findByIdAndDelete(req.params.id);
            try {
                console.log(req.params.id);
                await Employee.findByIdAndUpdate(employeeId, {
                    $pull: { deduction: req.params.id },
                });
            } catch (err) {
                next(err);
            }
            res.status(200).json("successfully deleted.");

        } else {
            res.status(404).json("there is no such deduction");
        }

    } catch (err) {
        next(err);
    }
};

//ADD EXISTING Deduction TO EMPLOY

exports.addExistingRoleToEmployee = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const employeeId = req.params.employeeId;
        console.log(roleId);

        const check = await Employee.find({ _id: employeeId });
        console.log(check[0])

        if (!check[0]?.customRole.includes(mongoose.Types.ObjectId(roleId))) {
            const updated = await Employee.findByIdAndUpdate(
                employeeId,
                {
                    $push: { customRole: roleId },
                },
                { new: true, useFindAndModify: false }
            )
                
             

            res.status(200).json(updated);
        } else {
            res.status(404).json("already added");
        }
    } catch (err) {
        next(err);
    }
};



//ADD DEDUCTION TO ALL EMPLOYEE 

exports.addExistingDeductionToAllEmployee = async (req, res, next) => {
    try {
        const deductionId = req.params.deductionId;
        const employeeData = await Employee.updateMany(
            { companyId: req.user.id },
            {
                $set: { deduction: deductionId },
            },
            { new: true }
        );
        console.log(`${employeeData.modifiedCount} documents updated`);

        if (employeeData.modifiedCount == 0) {
            res.status(200).json('Deduction is already added')
        } else
            res.status(200).json("Added Successfully");


    } catch (err) {
        res.status(500).json("Sothing gonna wrong")
    }
};




//ADD DEDUCTION TO EMPLOYEE UNDER SPECIFIC DEPARTMENT

exports.addExistingDeductionToAllEmployee = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const deductionId = req.params.deductionId;
        const employeeData = await Employee.updateMany(
            { department: departmentId },
            {
                $set: { deduction: deductionId },
            },
            { new: true }
        );
        console.log(`${employeeData.modifiedCount} documents updated`);

        if (employeeData.modifiedCount == 0) {
            res.status(200).json('Deduction is already added')
        } else
            res.status(200).json("Added Successfully");


    } catch (err) {
        res.status(500).json("Sothing gonna wrong")
    }
};




//ADD DEDUCTION TO EMPLOYEE UNDER SPECIFFIC JOB GRADE
