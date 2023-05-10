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
        const newPension = await Pension.create({
            employeeContribution:employeeContribution,
            employerContribution:employerContribution,         
            companyId: req.user.id
        });

      
        res.status(200).json({ newPension });

    } catch (err) {
        res.status(404).json({ error: err });
    }
};



// GET ALL
exports.get_All_pension = async (req, res, next) => {
    const failed = true;


    try {
        const pension = await Pension.find({ companyId: req.user.id });
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

exports.updateAllowance = async (req, res) => {
    try {
        const updatedAllowance = await Allowance.findByIdAndUpdate({
            companyId: req.user.id,
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedAllowance);
    } catch (error) {
        res.status(404).json(error)

    }
};


exports.Create_Allowances = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const newAllowance = new Allowance(req.body);
    try {
        const savedAllowance = await newAllowance.save();
        try {

            await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    allowance: savedAllowance._id
                }

            }, {
                new: true,
                useFindAndModify: false
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedAllowance);
    } catch (err) {
        next(err);
    }
};


// /UPDATE
exports.Update_Allowances = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const newAllowance = new Allowance(req.body);
    try {
        const savedAllowance = await newAllowance.save();
        try {

            await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    allowance: req.body.id
                }

            }, {
                new: true,
                useFindAndModify: false
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedAllowance);
    } catch (err) {
        next(err);
    }
};


// DELETE Allowances
exports.delete_pension = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Pension.findByIdAndDelete(req.params.id);
       
        

        res.status(200).json("pension has been deleted.");
    } catch (err) {
        next(err);
    }
};


// DELETE Allowances
exports.deleteAllowances = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Allowance.findByIdAndDelete(req.params.id);


        res.status(200).json("Allowance has been deleted.");
    } catch (err) {
        next(err);
    }
};


// ADD EXISTING ALLOWANCE TO EMPLOY
exports.addExistingAllowances = async (req, res, next) => {
    try {
        const allowanceId = req.params.allowanceId;
        const employeeId = req.params.employeeId;
        const check = await Employee.find({ _id: employeeId });

        if (!check[0].allowance.includes(mongoose.Types.ObjectId(allowanceId))) {
            const updated = await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    allowance: allowanceId
                }

            }, {
                new: true,
                useFindAndModify: false
            });

            res.status(200).json(updated);
        } else {
            res.status(404).json('already added')
        }
    } catch (err) {
        next(err);
    }

}


exports.deleteAllowance = async (req, res, next) => {

    try {

        const deletedAllowance = await Allowance.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedAllowance);

    } catch (error) {
        next(error)

    }
}
