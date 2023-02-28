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
router.put(
  '/:departmentId/',
  middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollController.add_payroll_to_Employee);

//ADD PAYROLL ON SELECTED DEPARTMENT



module.exports = router;
