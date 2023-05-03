const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/gradeAllowance.js');
const middleware = require('../middleware/auth.js')
//ADD ALLOWANCE
router.post('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.add_Allowance);

   
router.put('/:gradeId/:allowanceId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Add_Allowance_to_Grade);


//CREATE
router.post('/:gradeId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Add_Allowance_to_Grade);


    router.put('/:id',
    
        middleware.protect,
        middleware.restrictTo('Companyadmin'),
        allowanceController.updateAllowance);
    
    

//UPDATE
router.post('/:gradeId/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Update_Allowances),


    ///DELETE
    router.delete('/:gradeId/:id',
        middleware.protect,
        middleware.restrictTo('Companyadmin'),
        allowanceController.delete_Allowances);

//GET ONE
router.get('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.get_single_Allowance);
//GET ALL 
router.get('/',

    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.get_All_Allowance);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.post('/:allowanceId/:gradeId', middleware.protect,
    middleware.restrictTo('Companyadmin'), allowanceController.addExistingAllowances);

//DELETE Allowance
  router.delete('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.delete_from_allowancecollection_Allowances);


module.exports = router;
