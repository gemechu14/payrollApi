const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employee.js');
const middleware = require('../middleware/auth.js');

const fs=require('fs');
const Employee=require('../models/employee.js')

//////
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });
////

var storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, +Date.now() + '' + file.originalname);
  }
});

var upload1 = multer({ storage: storage1 });
//////



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '' + file.originalname);
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




//upload.single('images'),
router.post(
  '/',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  upload.single('images'),
  employeeController.add_employee
);






// router.post(
//   '/',
//   middleware.protect,
//   middleware.restrictTo('Companyadmin'),

//   employeeController.add_employee
// );
//UPDATE
router.put('/:employeeId', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.updateEmployee),

  //DELETE
router.delete('/:key', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.delete_Employee);

//GET ONE
router.get(
  'find/:id',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.get_single_Employee
);
//GET ALL
router.get(
  '/',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.get_All_Employee
);

router.get('/find', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.getbydept);
//SEARCH EMPLOYEE

router.get(
  '/employee/',
  
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.searchAllEmployee
);


/////
router.post('/gammee', middleware.protect, middleware.restrictTo('Companyadmin'), upload.single('file'),async(req,res,next)=>{

  try {

    let newPath = null;
    if (req.file) {
      console.log('images')
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }

    
      const {
      fullname,
      nationality,
      sex,
      id_number,
       email,

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
    } = req.body;

    // if (req.file.isEmpty) {
    //   images = req.files.map((file) => {
    //     return { img: file.filename };
    //   });
    // }
  
    const newEmployee = await Employee.create({
      fullname: fullname,
      nationality: nationality,
      sex: sex,
      id_number: id_number,
       email: email,
      department: department,
      
      phoneNumber: phoneNumber,//
      date_of_birth:date_of_birth,
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
      images: newPath ? newPath : null,


    
      // img:{
      //   data: fs.readFileSync("uploads/" + req.file.filename),
      //   contentType: "image/png",
      // }
    });
  
    res.status(200).json({
      //companyId: req.user.id,
      employee: newEmployee,

    });
  } catch (err) {
    next(err);
    // const newEmployee = new Employee(req.body);
    // try {
    //   // const saved = await newEmployee;
    //   const savedEmployee = await newEmployee().save();
    //   console.log(req.body);
    //   res.status(200).json({
    //     savedEmployee,
    //   });
    // } catch (err) {
    //   res.status(404).json({
    //     error: err,
    //   });
    // }
  }

}
);







module.exports = router;
