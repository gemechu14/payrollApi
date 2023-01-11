const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/Allowance.js');

//CREATE
router.post('/:employeeId', allowanceController.Create_Allowances);
//UPDATE
router.put('/:employeeId/:id', allowanceController.updateAllowance),
  //DELETE
  router.delete('/:employeeId/:id', allowanceController.delete_Allowances);

//GET ONE
router.get('/find/:id',allowanceController.get_single_Allowance);
//GET ALL 
router.get('/', allowanceController.get_All_Allowance);

module.exports = router;
