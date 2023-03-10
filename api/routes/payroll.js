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
//GET ALL Depts
router.get('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollController.get_All_Payroll);

router.get('/taxSlab/:payrollId',
middleware.protect,
middleware.restrictTo('Companyadmin'),
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





module.exports = router;
