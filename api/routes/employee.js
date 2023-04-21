const express = require("express");
const router = express.Router();
const multer = require("multer");
const employeeController = require("../controllers/employee.js");
const middleware = require("../middleware/auth.js");
const fs = require("fs");
const Employee = require("../models/employee.js");


const xlsx = require('xlsx');
//
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload2 = multer({ storage: storage2 });
//
var storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, +Date.now() + "" + file.originalname);
    },
});

var upload1 = multer({ storage: storage1 });
//////

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, +Date.now() + "" + file.originalname);
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

//upload.single('images'),
router.post(
    "/",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    upload.single("images"),
    employeeController.add_employee
);


//UPDATE
router.put(
        "/:employeeId",
        middleware.protect,
        middleware.restrictTo("Companyadmin"),
        employeeController.updateEmployee
    ),
    //DELETE
    router.delete(
        "/:key",
        middleware.protect,
        middleware.restrictTo("Companyadmin"),
        employeeController.delete_Employee
    );

//GET ONE
router.get(
    "find/:id",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.get_single_Employee
);
//GET ALL
router.get(
    "/",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.get_All_Employee
);

router.get(
    "/find",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.getbydept
);
//SEARCH EMPLOYEE

router.get(
    "/employee/",

    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.searchAllEmployee
);

/////
router.post(
    "/gammee",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    upload.single("file"),
    async(req, res, next) => {
        try {
            let newPath = null;
            if (req.file) {
                console.log("images");
                const { originalname, path } = req.file;
                const parts = originalname.split(".");
                const ext = parts[parts.length - 1];
                newPath = path + "." + ext;
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

            const newEmployee = await Employee.create({
                fullname: fullname,
                nationality: nationality,
                sex: sex,
                id_number: id_number,
                email: email,
                department: department,

                phoneNumber: phoneNumber, //
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
                images: newPath ? newPath : null,
            });

            res.status(200).json({

                employee: newEmployee,
            });
        } catch (err) {
            next(err);

        }
    }
);

router.post(
    "/setApprover",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.setApprovers
);

router.get(
    "/year",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.get_emp_by_year_month
);

router.get(
    "/dept/:departmentId",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.get_By_Department
);

router.get(
    "/pending/:departmentId",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.get_Pending_Payroll
);

//SET APPROVER
router.put(
    "/setApprovers/:id",
    middleware.protect,
    middleware.restrictTo("Companyadmin"),
    employeeController.setApprovers
);

router.get(
    "/userdata/:userId",
    middleware.protect,
    middleware.restrictTo("Companyadmin")
);

//Approve payroll
router.get(
    "/approve",
    middleware.protectE,
    middleware.restrictToA("approver"),
    employeeController.approvePayroll
);


//GET EMPLOYEE INFORMATION
router.get(
    "/info",
    middleware.protectE,
    middleware.restrictToA("employee","approver"),
    employeeController.getEmployeeInformation
);

//GET EMPLOYEE INFORMATION
router.get(
    "/approver/info",
    middleware.protectE,
    middleware.restrictToA("approver"),
    employeeController.getEmployeeInformation
);

router.post("/login", employeeController.login);
const upload3 = multer({ dest: 'uploads/' });



router.post('/file-upload', middleware.protect,
    middleware.restrictTo("Companyadmin"), employeeController.createEmployeeFile )


module.exports = router;