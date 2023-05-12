const express = require('express');
const router = express.Router();
const taxSlabController = require('../controllers/taxSlab.js');

const middleware=require('../middleware/auth.js')
//ADD
router.post('/',
  middleware.protectAll,
  middleware.restrictToAll('superAdmin'),
  taxSlabController.generalTaxslab);

// //GET ALL 
router.get('/',
  middleware.protectAll,
  middleware.restrictToAll('superAdmin', 'Companyadmin'),
taxSlabController.get_All_TaxSlab);

//DELETE
router.delete('/:id',
  middleware.protectAll,
  middleware.restrictToAll('superAdmin'),
  taxSlabController.delete_SINGLE_TAXSLAB);
//UPDATE
router.put('/:id',
  middleware.protectAll,
  middleware.restrictToAll('superAdmin'),
  taxSlabController.updateTaxslab);



//GET SINGLE Payroll
router.get('/find/:id',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),

  taxSlabController.get_single_TaxSlab);



module.exports = router;
