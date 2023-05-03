const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/Allowance.js');
const middleware = require('../middleware/auth.js');

const pensionController=require('../controllers/pension.js')
//ADD ALLOWANCE
router.post('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    pensionController.add_Pension);

//CREATE
router.post('/:employeeId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Create_Allowances);
//UPDATE
router.put('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.updateAllowance),
    ///DELETE
    router.delete('/:id',
        middleware.protect,
        middleware.restrictTo('Companyadmin'),
        pensionController.delete_pension);

//GET ONE
router.get('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.get_single_Allowance);
//GET ALL 
router.get('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
pensionController.get_All_pension);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.post('/:employeeId/:allowanceId', allowanceController.addExistingAllowances);

//DELETE Allowance
router.delete('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.deleteAllowance);


module.exports = router;
