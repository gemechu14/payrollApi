const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deduction.js');

//CREATE
router.post('/:employeeId', deductionController.Add_Deduction);
//UPDATE
router.put('/:employeeId/:id',deductionController.Update_DE),
  //DELETE
router.delete('/:employeeId/:id', deductionController.delete_Allowances);

//GET ONE
router.get('/find/:id', deductionController.get_single_Deduction);
//GET ALL 
router.get('/', deductionController.get_All_Deduction);

module.exports = router;
