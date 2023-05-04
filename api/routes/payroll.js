const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payroll.js');
const middleware=require('../middleware/auth.js')
//CREATE
router.post('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollController.add_payroll);
//UPDATE
router.put('/:id', payrollController.updatePayroll),
  //DELETE
  router.delete('/:id', payrollController.delete_Payroll);

//GET SINGLE Payroll
router.get('/find/:id',payrollController.get_single_payroll);



//GET ALL 
router.get('/',
middleware.protect,
//middleware.restrictTo('Companyadmin'),
//checkPermissions('payroll.view'),
payrollController.get_All_Payroll);




router.get('/taxSlab/:payrollId',
middleware.protect,
middleware.restrictTo('Companyadmin' ),
payrollController.get_taxslab_Payroll);


//ADD PAYROLL TO EMPLOYEE
router.put('/pay/:departmentId/',
middleware.protect,
middleware.restrictTo('Companyadmin'),

payrollController.add_payroll_to_Employee);


//ADD other allowance and deduction  TO EMPLOYEE
router.put('/update/:employeeId/',
middleware.protect,
middleware.restrictTo('Companyadmin'),

payrollController.add_allowance_and_deduction_to_Employee);

//ADD PAYROLL ON SELECTED DEPARTMENT




//ADD PAYROLL TO EMPLOYEE
router.post('/pay/:departmentId/',
middleware.protect,
middleware.restrictTo('Companyadmin'),

payrollController.get_All_pm);


//ADD PAYROLL TO EMPLOYEE
router.put('/pay1/:id/',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  payrollController.grantPermission);

//PAYROLL Calculation
router.post('/payrollCalc/:departmentId',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  payrollController.payrollCalculation);


// Middleware function to check user permissions
function checkPermissions(permission) {
  return function (req, res, next) {
    // Get the user's permissions from the database
    const userPermissions = req.user.permissions;
console.log(req.user)
    console.log("tahu",userPermissions);
    console.log("permission",permission)
    // Check if the user has the required permission
    if (userPermissions[permission].view) {
      // User has permission, allow access to the route
      next();
    } else {
      // User does not have permission, deny access to the route
      res.status(403).send('Access denied');
    }
  }
}
// // Example route that requires view permission for payroll
// app.get('/payroll', checkPermissions('payroll.view'), (req, res) => {
//   // Route logic goes here
// });
// // Example route that requires create permission for employee
// app.post('/employee', checkPermissions('employee.create'), (req, res) => {
//   // Route logic goes here
// });










  


module.exports = router;
