const LoanDefinition = require('../models/defineLoan.js');
const Employee = require('../models/employee.js');
const mongoose = require('mongoose')


exports.add_loan = async (req, res) => {
    try {
        const {
            name,
            description,
        } = req.body;
        const newloanDefinition = await LoanDefinition.create({
            name: name,
            description: description,
            companyId: req.user.id
        })

        res.status(200).json({ newloanDefinition });

    } catch (err) {
        res.status(404).json({ error: err });
    }
};



// GET ALL
exports.get_All_loan = async (req, res, next) => {
    const failed = true;


    try {
        const loan = await LoanDefinition.find({ companyId: req.user.id });
        res.status(200).json({ count: loan.length, loan });
    } catch (err) {
        next(err);
    }
};
// GET one
exports.get_one = async (req, res) => {
    try {
        const loan = await LoanDefinition.findById({ companyId: req.user.id, _id: req.params.id });
        res.status(200).json(loan);
    } catch (error) {
        res.status(404).json(error);
    }
};
// UPDATE

exports.updateLoan = async (req, res) => {
    try {
        const updatedLoan = await LoanDefinition.findByIdAndUpdate({
            companyId: req.user.id,
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(404).json(error)

    }
};


exports.Create_Loan = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const newAllowance = new Allowance(req.body);
    try {
        const savedLoan = await newAllowance.save();
        try {

            await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    laonId: savedLoan._id
                }

            }, {
                new: true,
                useFindAndModify: false
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedLoan);
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
exports.delete_Allowances = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Allowance.findByIdAndDelete(req.params.id);
        try {
            await Employee.findByIdAndUpdate(employeeId, {
                $pull: {
                    allowance: req.params.id
                }
            });
        } catch (err) {
            next(err);
        }


        res.status(200).json("Allowance has been deleted.");
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
