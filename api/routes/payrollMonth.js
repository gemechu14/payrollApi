const express=require('express');
const router=express.Router();
const payrollMonthController=require('../controllers/payrollMonth.js')
const middleware=require('../middleware/auth.js')

//INSERT EMPLOYEE
router.post('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),

payrollMonthController.add_payrollMonth);

//UPDATE
router.put('/:id',
middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollMonthController.updatemonthPayroll),

//DELETE
router.delete("/:id",


payrollMonthController.delete_monthPayroll);

//GET ONE
router.get('/find/:id', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollMonthController.get_single_monthPayroll);
//GET ALL 
router.get('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),
payrollMonthController.get_All_monthPayroll);

module.exports = router;
