const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deduction.js');
const middleware=require('../middleware/auth.js')
//CREATE
router.post('/',

middleware.protect,
middleware.restrictTo('Companyadmin'),

deductionController.add_new_deduction);




//UPDATE
router.put('/:employeeId/:id',
middleware.protect,
middleware.restrictTo('Companyadmin'),

deductionController.Update_DE),
  //DELETE
router.delete('/:employeeId/:id', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
deductionController.delete_Allowances);

//GET ONE
router.get('/find/:id', 
middleware.protect,
middleware.restrictTo('Companyadmin'),

deductionController.get_single_Deduction);
//GET ALL 
router.get('/', 

middleware.protect,
middleware.restrictTo('Companyadmin'),
deductionController.get_All_Deduction);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.post('/:employeeId/:deductionId',deductionController.addExistingDeduction
);


module.exports = router;
