const express = require('express');
const router = express.Router();
const taxExamptionController = require('../controllers/taxExamptionDate.js');

//CREATE
router.post('/', taxExamptionController.add_TaxExaptionDate);
//UPDATE
router.put('/:id', taxExamptionController.updateTaxExaptionDate),
  //DELETE
  router.delete('/:id', taxExamptionController.delete_TaxExaptionDate);

//GET SINGLE taxExamption
router.get('/find/:id',taxExamptionController.get_single_TaxExaptionDate);
//GET ALL 
router.get('/', taxExamptionController.get_All_TaxExaptionDate);

module.exports = router;
