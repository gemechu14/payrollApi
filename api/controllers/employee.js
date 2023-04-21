const Employee = require("../models/employee.js");
const Department = require("../models/department.js");
const middleware = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel.js");
const createError = require("../utils/error.js");
const multer = require("multer");
const mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");
const department = require("../models/department.js");





//const createError=required('../utils/error.js');
//const IMAGE_BASE_URL = "http://localhost:5000/image?name=";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

exports.add_employee = async(req, res, next) => {
    try {
        let generalDepartment = "";

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
            pension,
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
            position,
           // contact_name,
            emergency_contact_Info,
            contact_phoneNumber,
            relationship
        } = req.body;




        const newDepartment = await Department.find({
            companyName: req.user.companyName,
            deptName: "General",
        });


        generalDepartment = mongoose.Types.ObjectId(newDepartment[0]?._id);
  
        if (!department || department == undefined) {
            console.log("no department");
        }
     

        const newEmployee = await Employee.create({
            fullname: fullname,
            nationality: nationality,
            sex: sex,
            id_number: id_number,
            email: email,
            department: department ? department : generalDepartment,
            images: images,
            position: position,
            pension: pension,
            phoneNumber: phoneNumber,
            date_of_birth: date_of_birth,
            optionalNumber: optionalNumber,
            password: '00001111',
            // emergency_contact_Info: {
            //     contact_name: emergency_contact_Info.contact_name,
            //     relationship: emergency_contact_Info.relationship,
            //     contact_phoneNumber: emergency_contact_Info.contact_phoneNumber
            // },

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

        });

        res.status(200).json({


            status: "success",
            employee: newEmployee,
        });
    } catch (err) {
        next(createError.createError(404, err));

    }
};

//GET ALL
exports.get_All_Employee = async(req, res, next) => {
    try {
        const employee = await Employee.find({ companyId: req.user.id })
            .populate("department")
            .populate("allowance")
            .populate("payroll")
            .populate("deduction")
            .populate("gradeId");
        res.status(200).json({
            count: employee.length,
            employee,
        });
    } catch (err) {
        next(createError.createError(404, err));
    }
};

//GET one
exports.get_single_Employee = async(req, res) => {
    try {
        const employee = await Employee.find({
                companyId: req.user.id,
                _id: req.params.id,
            })
            .populate("department")
            .populate("allowance")
            .populate("payroll")
            .populate("deduction");
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

exports.updateEmployee = async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.employeeId, { $set: req.body }, { new: true }
        );
        console.log(req.body);
        res.status(200).json(updatedEmployee);
    } catch (error) {}
};

//DELETE EMPLOYEE
exports.delete_Employee = async(req, res, next) => {
    try {
        console.log(req.params.key);
        const response = await Employee.findByIdAndDelete(req.params.key);

        res.status(200).json({ response });
    } catch (err) {
        next(err);
    }
};


//SEARCH ALL EMPLOYEE
exports.searchAllEmployee = async(req, res, next) => {
    try {
        const query = req.query.search_query;
        console.log(query);
        const key = req.params.key;
        console.log(req.user.id);
        const employee = await Employee.find({
                $and: [
                    { companyId: req.user.id },
                    { fullname: { $regex: new RegExp(query, "i") } },
                ],
            })
            .populate("department")
            .populate("allowance")
            .populate("payroll")
            .populate("deduction");
        res.status(200).json({
            user: employee,
        });
    } catch (err) {
        next(err);
    }
};

//SEARCH BY DEPARTMENT IDD
exports.get_By_Department = async(req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        let data = "";
        console.log(departmentId);

        const emp1 = await Employee.find({ companyId: req.user.id, department: departmentId }, { "year.month": 1 });

        await Employee.find({
                companyId: req.user.id,
                department: departmentId,
            })
            .exec()
            .then((docs) => {
                const other = docs.map((doc) => {
                    return {
                        _id: doc._id,
                        name: doc.fullname,
                        department: doc.department,
                        companyId: doc.companyId,
                        year: doc.year,
                    };
                });
                data = other;
            });


        res.status(200).json({
            data,
        });
    } catch (err) {
        next(err);
    }
};


exports.getbydept = async(req, res, next) => {
    try {
        const query = req.query.department;
             const employee = await Employee.find({
                $and: [
                    { companyId: req.user.id },
                    {
                        department: query,
                    },
                ],
            })
            .populate("department")
            .populate("allowance")
            .populate("payroll")
            .populate("deduction");

        console.log(employee);
        res.status(200).json({
            count1: employee.length,
            employee: employee,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateEmploye = async(req, res, next) => {
    const employeeId = req.params.employeeId;
};

//set role
exports.setApprovers = async(req, res, next) => {
    try {

        const approvers = await  Employee.findOneAndUpdate({ _id:req.params.id }, { $set: { role: "approver" } }, { new: true });
       
        res.status(200).json({
            approvers
        });
    } catch (err) {
        createError.createError(404, err);
    }
};

//pension

exports.updatePension = async(req, res, next) => {
    try {
        //const employee=await Employee.find({companyId:req.user.id});
        const employee = await Employee.updateMany({ companyId: req.user.id }, { $set: { pension: req.body.pension } });
    } catch (err) {
        createError.createError(404, err);
    }
};

exports.updatePensionByDepartment = async(req, res, next) => {
    try {
   
        const employee = await Employee.updateMany({ companyId: req.user.id, department: req.params.departmentId }, { $set: { pension: req.body.pension } });
    } catch (err) {
        createError.createError(404, err);
    }
};

//Fetch employee using year month and department

exports.get_emp_by_year_month = async(req, res, next) => {
    try {
        departmentId = req.query.department;
        year = req.query.year;
        month = req.query.month;
        console.log(year);
        console.log(month);
        console.log(departmentId);

        const employee = await Employee.find({
                companyId: req.user.id,
                department: departmentId,
                "year.name": "2023",
                "year.month.name": "July",
            })
            .populate("allowance")
            .populate("payroll")
            .populate("deduction");
        res.status(200).json({
            employee: employee[0].year[0].month,
        });
    } catch (err) {
        createError.createError(404, err);
    }
};





//Get Approved Payroll


exports.get_Pending_Payroll = async(req, res, next) => {

    try {

        let data = "";
        let data1 = '';

        const departmentId = req.params.departmentId;


        await Employee.find({ companyId: req.user.id, department: departmentId }).exec().then((docs) => {
            //console.log("docs:", docs);
            const other = docs.map((doc) => {
                return {
                    _id: doc._id,
                    arrears: doc.arrears,
                    lateSittingOverTime: doc.lateSittingOverTime,
                    dayDeduction: doc.dayDeduction,
                    EOTBDeduction: doc.EOTBDeduction,
                    department: doc.department,
                    companyId: doc.companyId,
                    payrollStatus: doc.payrollStatus,
                    year: doc.year,
                    // month: monthArray?.map((item) => item[0]?.name),
                };
            });
            // }

            data = other;



            // console.log("data", data);
        });
        try {
        
            console.log("data length:", data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("i", i);
                
            }
            res.status(200).json("done");
        } catch (err) {
            createError.createError(404, err);
        }
    } catch (err) {
        next(err);
    }



}


const signToken = (id) => {
    try {
        return jwt.sign({ id }, 'secret', {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    console.log(user._id);
    // const patientID = patient._id;
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),

        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
    };
    //console.log(user);

    //remove password from the output
    user.password = undefined;
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        message: 'successful',
        token,

        data: {
            user,
        },
    });
};



exports.login = async(req, res, next) => {
    try {
        const { email, password, } = req.body;
        console.log(email);
        console.log(password);
        //check if email and password exist company code
        if (!email || !password) {
            return next(
                createError.createError(
                    404,
                    'please provide email, password or company code!'
                )
            ); //res
            //   .status(404)
            //   .json({ message: 'please provide email, password or company code' });
        }
        //check if user exists and password is correct
        const user = await Employee.findOne({ email }).select('+password');


        if (!user || !(await user.correctPassword(password, user.password))) {
            return res
                .status(401)
                .json({ message: 'Incorrect email, password ' });
            //next(createError.createError(401,'Incorrect email, password or company Code'))
        }

        // const token=signToken(user._id);
        //if everything is ok send token to the client
        createSendToken(user, 200, res);
     
    } catch (err) {
     
        res.status(404).json({
            status: 'fail123',
            message: err,
        });
    }
};



//APPROVE PAYROLL
exports.approvePayroll = async(req, res, next) => {

    try {

        res.status(200).json('hello')

    } catch (err) {
        res.status(404).json(err);
    }


}


//Get Employee Information 
exports.getEmployeeInformation = async(req, res, next) => {

    try {
        const employee = await Employee.find({ _id: req.user.id, companyId: req.user.companyId }, )

        res.status(200).json({
                id: employee[0]._id,
                name: employee[0].fullname,
                payslip: employee[0].payslip
            }

        )
    } catch (err) {
        res.status(404).json(err);
    }


}


//Import from Excel

exports.excelImport=async (req,res,next)=>{

try {
    const multer = require('multer');
    // configure storage engine for multer 
    const storage = multer.memoryStorage();
    // create instance of multer and specify storage engine 
    const upload = multer({ storage: storage });
    // middleware for file upload 
    const fileUploadMiddleware = upload.single('file');

    module.exports = { fileUploadMiddleware };//asset

    const xlsx = require('xlsx');     




    let generalDepartment = "";

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
        pension,
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
        position,
        // contact_name,
        emergency_contact_Info,
        contact_phoneNumber,
        relationship
    } = req.body;







} catch (err) {
    
}
}











const xlsx = require('xlsx');
// const EmployeeModel = require("../models/employeeModel")
// const AccountModel = require("../models/AccountModel")


///storage 

// configure storage engine for multer 
const storage4 = multer.memoryStorage();

// create instance of multer and specify storage engine 
const upload4 = multer({ storage: storage4 }).single('file');

exports.createEmployeeFile = async (req, res, next) => {
    upload4 (req, res, async(err) => {
        if (err) {
            console.log(err)
        } 
        else{
            try  {
                const workbook = xlsx.read(req.file.buffer);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(worksheet);
                const numRecords = data.length;
                const employeData = data.map((row) => ({
                    fullname: row['fullname'],
                    nationality: row['nationality'],
                    phoneNumber: row['phoneNumber'],
                    email: row['email'],
                    accountNumber: row['Account Number'],
                    date_of_birth: row['date_of_birth'],
                    sex: row['sex'],
                    department: row['department'],
                    id_number: row['id_number'],
                    basicSalary: row['basicSalary'],
                    companyId:req.user.id
                })
                
                )


          await   Employee.insertMany(employeData, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Data imported successfully!');
                    }
                });
                
                res.status(200).json(employeData)
            } catch (error) {
                next(error);
            }
        }
    });
};

