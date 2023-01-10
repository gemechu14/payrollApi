const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payroll.js');

//CREATE
router.post('/', payrollController.add_payroll);
//UPDATE
router.put('/:id', payrollController.updatePayroll),
  //DELETE
  router.delete('/:id', payrollController.delete_Payroll);

//GET SINGLE Payroll
router.get('/find/:id',payrollController.get_single_payroll);
//GET ALL Depts
router.get('/', payrollController.get_All_Payroll);

//ADD PAYROLL TO EMPLOYEE
router.put('/put/:departmentId/:payrollId',payrollController.add_payroll_to_Employee);

//ADD PAYROLL ON SELECTED DEPARTMENT



module.exports = router;
