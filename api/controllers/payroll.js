const Payroll = require('../models/payroll.js');
const Employee = require('../models/employee.js');
const { set } = require('mongoose');

exports.add_payroll = async (req, res) => {
  const newPayroll = new Payroll(req.body);

  try {
    const savedPayroll = await newPayroll.save();

    console.log(req.body);
    res.status(200).json({
      savedPayroll,
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

//GET ALL
exports.get_All_Payroll = async (req, res, next) => {
 


  try {
    const payrolls = await Payroll.find().populate('taxSlab');
    res.status(200).json({
      count: payrolls.length,
      payrolls,
    });
  } catch (err) {
    next(err);
  }
};
//GET SINGLE Payroll
exports.get_single_payroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updatePayroll = async (req, res) => {
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPayroll);
  } catch (error) {}
};
//DELETE
exports.delete_Payroll = async (req, res,next) => {
 // const employeeId = req.params.employeeId;

  try {
    console.log(req.params.id);
    await Payroll.findByIdAndDelete(req.params.id);
  //   try {
  //     console.log(req.params.id);
  //   await Employee.findByIdAndUpdate(employeeId, {
  //     $pull: { payroll: req.params.id },
  //   });
  // } catch (err) {
  //   next(err);
  // }
    res.status(200).json('Payroll has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};


//ADD PAYROLL TO EMPLOYEE

exports.add_payroll_to_Employee= async (req,res,next) => {
  
  const departmentId = req.params.departmentId;
   const payrollId=req.params.payrollId;
    
    try {
      console.log(departmentId);
  const updated=await Employee.updateMany({department:departmentId},{$set:{payroll:payrollId}})

      // await Employee.findByIdAndUpdate(departmentId, {
      //   $push: { payroll: req.params.id },
      // });
       res.status(200).json(updated)
    } catch (err) {
      next(err);
    }

 

}

//ADD PAYROLL TO DEPARATMENT

