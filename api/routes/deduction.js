const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deduction.js');
const middleware=require('../middleware/auth.js')
//CREATE
router.post('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),

deductionController.add_new_deduction);


router.post('/:employeeId',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  deductionController.Add_Deduction);


//UPDATE
router.put('/:employeeId/:id',
middleware.protect,
middleware.restrictTo('Companyadmin'),




deductionController.Update_DE),
  //DELETE
router.delete('/:id', 
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
router.post('/:employeeId/:deductionId',
middleware.protect,
middleware.restrictTo('Companyadmin'),

deductionController.addExistingDeduction
);



//ADD EXISTING ALLOWANCE TO ALL EMPLOYEE
router.put('/:deductionId',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  deductionController.addExistingDeductionToAllEmployee
);

//ADD EXISTING ALLOWANCE TO ALL EMPLOYEE  UNDER SPECIFIC DEPARTMENT
router.put('/addToDepartment/:departmentId/:deductionId',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  deductionController.addExistingDeductionToAllEmployee
);
module.exports = router;
