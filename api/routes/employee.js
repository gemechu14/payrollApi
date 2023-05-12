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
    middleware.restrictTo({ employee: "write" }),
    upload.single("images"),
    employeeController.add_employee
);


//UPDATE
router.put(
        "/:employeeId",
    middleware.protect,
    middleware.restrictTo({ employee: "write" }),
        employeeController.updateEmployee
    ),
    //DELETE
    router.delete(
        "/:key",
        middleware.protectAll,
        middleware.restrictToAll('Companyadmin'),
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
    middleware.restrictTo({ employee: "read" }),
    employeeController.get_All_Employee
);

router.get(
    "/find",
    middleware.protect,
    middleware.restrictTo({ employee: "read" }),
    employeeController.getbydept
);

//GRANT PERMISSION


router.put(
    "/permission/:id",
    middleware.protect,
    middleware.restrictTo({ employee: "update" }),
    employeeController.grantPermission
);
//SEARCH EMPLOYEE
router.get(
    "/:id",
    middleware.protect,
    middleware.restrictTo({ employee: "read" }),
    employeeController.searchAllEmployee
);



router.post(
    "/setApprover",
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
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
    middleware.restrictTo({ employee: "read" }),
    employeeController.get_By_Department
);

router.get(
    "/pending/:departmentId",
    middleware.protect,
    middleware.restrictTo({ employee: "read" }),
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