const Payroll = require('../models/payroll.js');
const Employee = require('../models/employee.js');
const { set } = require('mongoose');
const createError=require('../utils/error.js')
exports.add_payroll = async (req, res,next) => {
  //const newPayroll = new Payroll(req.body);

  try {
    const {
      payrollID,
      payrollName,
      taxSlab,
      payrollYear,
      type,
      
      employeer_Contribution,
      employee_Contribution,
      taxable_income_limit,
      exampt_age_limit,
      exampt_percentage
    }=req.body;
    const payroll = await Payroll.find({
      $and: [ { companyId:req.user.id },{ payrollID: payrollID},{payrollName: payrollName}],}
    );
    //const len=payroll.length;
    console.log(payroll.length);

    if(!payroll  || payroll.length==0){

      const newpayroll = await Payroll.create({
        payrollID:payrollID,
        payrollName:payrollName,
        taxSlab:taxSlab,
        payrollYear:payrollYear,
        companyId:req.user.id,
        type:type,
        employeer_Contribution:employeer_Contribution,
        employee_Contribution:employee_Contribution,
        taxable_income_limit:taxable_income_limit,
        exampt_age_limit:exampt_age_limit,
        exampt_percentage:exampt_percentage
      })
   
  
  
      //const savedPayroll = await newPayroll.save();
  
      console.log(req.body);
      res.status(200).json({
        newpayroll,
      });
    }else{
    
      res.status(404).json('The payroll already exists')
    }


  } catch (err) {
   next(createError.createError(404,err))
  }
};

//GET ALL
exports.get_All_Payroll = async (req, res, next) => {
 


  try {
    const payrolls = await Payroll.find({companyId:req.user.id}).populate('taxSlab');
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


///


exports.add_payroll_to_Employee= async (req,res,next) => {
  
  const departmentId = req.params.departmentId;
   const payrollId=req.params.payrollId;
    
    try {
   const {
    month,
    year,
    payrollId,
    netSalary,
    arrears,
    lateSittingOverTime,
    dayDeduction,
    EOTBDeduction
   }=req.body;

  //  year: [{
  //   name:'2013',
  //   month:[
  //     {
  //       name:'Jan',
  //       payroll:'63eb2c646e8057d17e62cde8'
  //      },
  //      {
  //       name:'FEB',
  //       payroll:'63eb2c646e8057d17e62cde8'
  //      },
      

  //   ]
     
  
        
  // }


  //  ]

//const emp=await Employee.find({department:departmentId});
//console.log(emp);


console.log(emp.department);

      console.log(departmentId);
  const updated=await Employee.updateMany({department:departmentId},{

    $push:{  year: [{
        name:year,
        month:[
          {
            name:month,
            netSalary,
            payroll:payrollId  ,
            arrears,
            lateSittingOverTime,
            dayDeduction,
            EOTBDeduction         },
                 
    
        ]
           
            
      }
    
    
       ]    
    }})

      // await Employee.findByIdAndUpdate(departmentId, {
      //   $push: { payroll: req.params.id },
      // });
       res.status(200).json(updated)
    } catch (err) {
      res.status(404).json(err)
    }

 

}

//ADD PAYROLL TO DEPARATMENT

//Get taxSlab

exports.get_taxslab_Payroll = async (req, res, next) => {
 


  try {
    const payrolls = await Payroll.find({companyId:req.user.id,_id:req.params.payrollId}).populate('taxSlab');
    res.status(200).json({
      count: payrolls.length,
      taxSlab:payrolls[0].taxSlab,
    });
  } catch (err) {
    next(err);
  }
};

exports.get_delete_Payroll = async (req, res, next) => {
 


  try {
    const payrolls = await Payroll.find({companyId:req.user.id}).populate('taxSlab');
    res.status(200).json({
      count: payrolls.length,
      payrolls,
    });
  } catch (err) {
    next(err);
  }
};