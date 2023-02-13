const express = require('express');
const router = express.Router();
const taxSlabController = require('../controllers/taxSlab.js');

//CREATE
//router.post('/:payrollId', taxSlabController.add_TaxSlab);
//UPDATE
// router.put('/:id/payrollId',taxSlabController.updateTaxSlab),
  //DELETE
  router.delete('/:id', taxSlabController.delete_TaxSlab);

//GET SINGLE Payroll
router.get('/find/:id',taxSlabController.get_single_TaxSlab);
// //GET ALL 
router.get('/', taxSlabController.get_All_TaxSlab);
router.post('/:payrollId',taxSlabController.add_taxslab)

module.exports = router;
