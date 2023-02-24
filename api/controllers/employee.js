const Employee = require('../models/employee.js');
const Department = require('../models/department.js');
const middleware = require('../middleware/auth.js');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel.js');
const createError = require('../utils/error.js');
const multer = require('multer');
const mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
//const createError=required('../utils/error.js');
//const IMAGE_BASE_URL = "http://localhost:5000/image?name=";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {

    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});





//Add



exports.add_employee = async (req, res, next) => {
  try {

    let generalDepartment='';

    const {
      fullname,
      nationality,
      sex,
      id_number,
      email,
      year,
      date_of_birth,
      images,
      phoneNumber,
      optionalNumber,
      emergency_contact,
      hireDate,
      joiningDate,
      employeeCode,
      employeeType,
      accountTitle,
      accountNumber,
      paymentMethod,
      department,
  
      separationDate,
      basicSalary,
      housingAllowance,
      positionAllowance,
      hardshipAllowance,
      desertAllowance,
      transportAllowance,
      cashIndeminityAllowance,
      fieldAllowance,
      overtimeEarning,
      otherEarning,
      lateSittingOverTime,
      arrears,
      dayDeduction,
      socialSecurity,
      providentFund,
      EOTBDeduction,
      TaxDeduction,
      netSalary,
      position
    } = req.body;






    //const dateFormatter = Intl.DateTimeFormat('sv-SE');
    // x= ISODate(hireDate)
    // Use the formatter to format the date
    //console.log(hireDate.toLocaleDateString('en-US'));

  //   let newPath = null;
  //   if (req.files[0].path) {
  //     console.log(req.files[0].path)
  //     images=req.files[0].path;
  //     // const { originalname, path } = req.file;
  //     // const parts = originalname.split('.');
  //     // const ext = parts[parts.length - 1];
  //     // newPath = path + '.' + ext;
  //     // fs.renameSync(path, newPath);
  //   }
  //  // console.log(req.files[0].path);

  //  if (req.files == undefined) {
  //   res.status(400).json({ message: "Please upload a file!" });
  // }


 // console.log(req.file.path)
//   if (req.file) {
//     console.log('Here it is');
    
//   //  const filename = Date.now() + req.file;
//    // data.append("name", filename);
//     //data.append("file", file);
//    // images = filename;
//  //console.log(req.files[0]);
//  // images:req.files[0].path;
//   }



const newDepartment=await Department.find({companyName:req.user.companyName, deptName:'General'});

console.log(mongoose.Types.ObjectId(newDepartment[0]._id));
console.log(newDepartment[0]._id);

generalDepartment=mongoose.Types.ObjectId(newDepartment[0]._id);
if(!department || department==undefined){
console.log('no department')

}
console.log(department==undefined)

    const newEmployee = await Employee.create({
      fullname: fullname,
      nationality: nationality,
      sex: sex,
      id_number: id_number,
      email: email,
      department: department?department:generalDepartment,
      images:  images,
      position: position,
      phoneNumber: phoneNumber,
      date_of_birth: date_of_birth,
      optionalNumber: optionalNumber,
      emergency_contact: emergency_contact,

      hireDate: hireDate,
      joiningDate: joiningDate,
      employeeCode: employeeCode,
      employeeType: employeeType,
      accountTitle: accountTitle,
      accountNumber: accountNumber,
      paymentMethod: paymentMethod,
      separationDate: separationDate,


      //Salary Information

      basicSalary: basicSalary,
      housingAllowance: housingAllowance,
      positionAllowance: positionAllowance,
      hardshipAllowance: hardshipAllowance,
      desertAllowance: desertAllowance,
      transportAllowance: transportAllowance,
      cashIndeminityAllowance: cashIndeminityAllowance,
      fieldAllowance: fieldAllowance,
      overtimeEarning: overtimeEarning,
      otherEarning: otherEarning,
      lateSittingOverTime: lateSittingOverTime,
      arrears: arrears,
      dayDeduction: dayDeduction,
      socialSecurity: socialSecurity,
      providentFund: providentFund,
      EOTBDeduction: EOTBDeduction,
      TaxDeduction: TaxDeduction,
      netSalary: netSalary,
      companyId: req.user.id,

      // year: [{
      //   name: '2013',
      //   month: [
      //     {
      //       name: 'Jan',
      //       payroll: '63eb2c646e8057d17e62cde8'
      //     },
      //     {
      //       name: 'FEB',
      //       payroll: '63eb2c646e8057d17e62cde8'
      //     },  ]
      // }


      // ]
      // images: newPath ? newPath : null,



      // img:{
      //   data: fs.readFileSync("uploads/" + req.file.filename),
      //   contentType: "image/png",
      // }
    });
   // const y = await companyId1(req, res);
    res.status(200).json({
      //companyId: req.user.id,

      status:'success',
      employee: newEmployee,

    });

  
  } catch (err) {

    next(createError.createError(404, err));
    // res.status(404).json({
    //   error:err
    // })
   }
};

//GET ALL
exports.get_All_Employee = async (req, res, next) => {
  try {
    const employee = await Employee.find({ companyId: req.user.id })
     .populate('department')
      .populate('allowance')
      .populate('payroll')
      .populate('deduction');
    res.status(200).json({
      count: employee.length,
      employee


    });
  } catch (err) {
 next(  createError.createError(404,err))
  }
};
//   fullname: employee,
// nationality: employee.nationality,
// sex: employee.sex,
// id_number: employee.id_number,
// email: employee.email,
// department: employee.department,
// //images: req.file.path,
// phoneNumber: employee.phoneNumber,//
// date_of_birth:employee.date_of_birth,
// optionalNumber: employee.optionalNumber,
// emergency_contact: employee.emergency_contact,
// hireDate: employee.hireDate,
// joiningDate: employee.joiningDate,
// employeeCode: employee.employeeCode,
// employeeType: employee.employeeType,
// accountTitle: employee.accountTitle, 
// accountNumber: employee.accountNumber,
// paymentMethod: employee.paymentMethod,

// separationDate: employee.separationDate,
// basicSalary: employee.basicSalary,
// housingAllowance: employee.housingAllowance,
// positionAllowance: employee.positionAllowance,
// hardshipAllowance: employee.hardshipAllowance,
// desertAllowance: employee.desertAllowance,
// transportAllowance: employee.transportAllowance,
// cashIndeminityAllowance: employee.cashIndeminityAllowance,
// fieldAllowance: employee.fieldAllowance,
// overtimeEarning: employee.overtimeEarning,
// otherEarning: employee.otherEarning,
// lateSittingOverTime: employee.lateSittingOverTime,
// arrears: employee.arrears,
// dayDeduction: employee.dayDeduction,
// socialSecurity: employee.socialSecurity,
// providentFund: employee.providentFund,
// EOTBDeduction: employee.EOTBDeduction,
// TaxDeduction: employee.TaxDeduction,
// netSalary: employee.netSalary,
// companyId: employee.companyId,
//GET one
exports.get_single_Employee = async (req, res) => {
  try {
    const employee = await Employee.find({
      companyId: req.user.id,
      _id: req.params.id,
    })
      .populate('department')
      .populate('allowance')
      .populate('payroll')
      .populate('deduction');
    res.status(200).json({
      count: employee.length,
      employee: {
        name: employee.fullname,
      },
    });
  } catch (err) {
    next(err);
  }
};
//UPDATE

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      { $set: req.body },
      { new: true }
    );
    console.log(req.body)
    res.status(200).json(updatedEmployee);
  } catch (error) { }
};

//DELETE EMPLOYEE
exports.delete_Employee = async (req, res, next) => {
  try {
    console.log(req.params.key);
    const response = await Employee.findByIdAndDelete(req.params.key);

    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
};

///

//SEARCH ALL EMPLOYEE

exports.searchAllEmployee = async (req, res, next) => {
  try {
    const query = req.query.search_query;
    console.log(query);
    const key = req.params.key;
    console.log(req.user.id);
    const employee = await Employee.find({
      $and: [
        { companyId: req.user.id },
        { fullname: { $regex: new RegExp(query, 'i') } },
      ],
    })
      .populate('department')
      .populate('allowance')
      .populate('payroll')
      .populate('deduction');
    res.status(200).json({
      user: employee,
    });
  } catch (err) {
    next(err);
  }
};

//SEARCH BY DEPARTMENT IDD
exports.get_By_Department = async (req, res, next) => {
  const departmentId = req.params.departmentId;
  try {
    const list_of_employee = await Employee.find({
      companyId: req.user.id,
      departmentId: departmentId,
    });


    res.status(200).json({
      len: list_of_employee.length,

      list_of_employee: list_of_employee
    });
  } catch (err) {
    next(err);
  }
};


exports.getbydept = async (req, res, next) => {
  try {
    const query = req.query.department;
    console.log(query);

    console.log('helooo');
    const employee = await Employee.find({
      $and: [{ companyId: req.user.id }, {
        department: query
      },],
    }

    );

    console.log(employee);;
    res.status(200).json({
      count1: employee.length,
      employee: employee,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEmploye=async(req,res,next)=>{
  const employeeId=req.params.employeeId;
}