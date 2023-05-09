const Loan = require('../models/loan.js');
const Employee = require('../models/employee.js');
const mongoose = require('mongoose')


exports.add_loan = async (req, res) => {
    try {
        const {
            name,
            amount,
            isInterestFree,
            returnPeriod,
            interest,
            returnedAmount,
            description,
        } = req.body;
        const newLoan = await Loan.create({
            name: name,
            amount: amount,
            isInterestFree:isInterestFree,
            returnPeriod:returnPeriod,
            interest:interest,
            returnedAmount:returnedAmount,
            description:description,
            companyId: req.user.id
        })


        res.status(200).json({ newLoan });

    } catch (err) {
        res.status(404).json({ error: err });
    }
};



// GET ALL
exports.get_All_loan = async (req, res, next) => {
    const failed = true;


    try {
        const loan = await Loan.find({ companyId: req.user.id });
        res.status(200).json({ count: loan.length, loan });
    } catch (err) {
        next(err);
    }
};
// GET one
exports.get_one = async (req, res) => {
    try {
        const loan = await Loan.findById({ companyId: req.user.id, _id: req.params.id });
        res.status(200).json(loan);
    } catch (error) {
        res.status(404).json(error);
    }
};
// UPDATE

exports.updateLoan = async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate({
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
  
    try {

        const employeeId = req.params.employeeId;
        const newloan = new Loan(req.body);
         const savedLoan = await newloan.save();

 const checkLoan=await Employee.find({companyId:req.user.id, laonId:savedLoan.name});

 if(checkLoan.length!=0){
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

 }
 else{
    res.status(404).json('You have allready added')
 }
        
    } catch (err) {
        next(err);
    }
};


// /UPDATE
exports.Update_Loan = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const newLoan = new Loan(req.body);
    try {
        const savedAllowance = await newAllowance.save();
        try {

            await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    loanId: req.body.id
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
exports.delete_laon = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {

        const checkLoan=await Loan.find({companyId:req.user.id, _id:req.params.id});


        if(checkLoan.length!=0){
            await Loan.findByIdAndDelete(req.params.id);
            try {
                await Employee.findByIdAndUpdate(employeeId, {
                    $pull: {
                        loanId: req.params.id
                    }
                });
            } catch (err) {
                next(err);
            }
        }
        else{
            res.status(404).json('There is no such Loan ')
        }
       


        res.status(200).json("Loan has been deleted.");
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
exports.addExistingLoan = async (req, res, next) => {
    try {
        const loanId = req.params.loanId;
        const employeeId = req.params.employeeId;
        const check = await Employee.find({ _id: employeeId });

        if (!check[0].allowance.includes(mongoose.Types.ObjectId(loanId))) {
            const updated = await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    loanId: loanId
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



exports.updateLoan = async (req, res) => {
    try {
        const updatedLoan = await Allowance.findByIdAndUpdate({
            companyId: req.user.id,
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json("updated successfully");
    } catch (error) {

        error
    }
};


//ADD EXISTING Deduction TO EMPLOY

exports.addExistingLoanToEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employeeId = req.params.employeeId;
console.log(id,employeeId)
    const check = await Employee.find({ _id: employeeId });

    if (!check[0].loanId.includes(mongoose.Types.ObjectId(id))) {
      const updated = await Employee.findByIdAndUpdate(
        employeeId,
        {
          $push: { loanId: id },
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