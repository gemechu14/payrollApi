const express=require('express');
const router=express.Router();
const payrollMonthController=require('../controllers/payrollMonth.js')


//INSERT EMPLOYEE
router.post('/', payrollMonthController.add_payrollMonth);

//UPDATE
router.put('/:id', payrollMonthController.updatemonthPayroll),

//DELETE
router.delete("/:id",payrollMonthController.delete_monthPayroll);

//GET ONE
router.get('/find/:id', payrollMonthController.get_single_monthPayroll);
//GET ALL 
router.get('/', payrollMonthController.get_All_monthPayroll);

module.exports = router;
