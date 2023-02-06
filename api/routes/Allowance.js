const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/Allowance.js');

const middleware=require('../middleware/auth.js')
//ADD ALLOWANCE
router.post('/',allowanceController.add_Allowance)
//CREATE
router.post('/:employeeId',
 allowanceController.Create_Allowances);
//UPDATE
router.put('/:employeeId/:id', 
allowanceController.updateAllowance),
  ///DELETE
router.delete('/:employeeId/:id', allowanceController.delete_Allowances);

//GET ONE
router.get('/find/:id',allowanceController.get_single_Allowance);
//GET ALL 
router.get('/', allowanceController.get_All_Allowance);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.post('/:employeeId/:allowanceId',allowanceController.addExistingAllowances);

module.exports = router;
