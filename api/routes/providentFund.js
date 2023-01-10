const express = require('express');
const router = express.Router();
const providentFundController = require('../controllers/providentFund.js');

//CREATE
router.post('/', providentFundController.add_ProvidentFund);
//UPDATE
router.put('/:id', providentFundController.updateProvidentFund),
  //DELETE
  router.delete('/:id', providentFundController.delete_ProvidentFund);

//GET SINGLE 
router.get('/find/:id',providentFundController.get_single_ProvidentFund);
//GET ALL 
router.get('/', providentFundController.get_All_Payroll);

module.exports = router;
