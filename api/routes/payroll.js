const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payroll.js');
const middleware=require('../middleware/auth.js')


const { Worker } = require('worker_threads')



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

router.get('/checkpay/',  middleware.protect,
  middleware.restrictTo('Companyadmin'),

  payrollController.checkPay);



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

//PAYROLL Calculation
router.get('/payrollCalculation/:employeeId',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  payrollController.runPayrollForAllEmp);


//PAYROLL Calculation
router.get('/payrollCalculation1',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  payrollController.calculatePayrollForAllEmployee);


//GET PAYROLL FOR SPECIC MONTH

router.get('/payrollForMonth',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  payrollController.getPayrollForSpecificMonth);



// Middleware function to check user permissions
function checkPermissions(permission) {
  return function (req, res, next) {
    // Get the user's permissions from the database
    const userPermissions = req.user.permissions;

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





router.get('/run-payroll', 

middleware.protect,
middleware.restrictTo('Companyadmin'),

   async (req, res) => {
  // Set the response type to text/event-stream
  
  
  const worker = new Worker('./api/routes/worker.js')

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send a message to the worker thread
  worker.postMessage({status: 'start', user:req.user.id});
  console.log("user",req.user.id)
  // Listen for messages from the worker thread
  worker.on('message', (message) => {
    if (message.type === 'progress') {
      // Send progress updates to the frontend
      res.write(`data: ${JSON.stringify({ type: 'progress', value: message.value })}\n\n`);
    } else if (message.type === 'complete') {
      // Send a complete message to the frontend
      res.write(`data: ${JSON.stringify({ type: 'complete' })}\n\n`);
      // Terminate the worker thread
      worker.terminate();
      // End the response
      res.end();
    }
  });
});





  


module.exports = router;
