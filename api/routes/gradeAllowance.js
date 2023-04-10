const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/gradeAllowance.js');
const middleware = require('../middleware/auth.js')
//ADD ALLOWANCE
router.post('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.add_Allowance);

//CREATE
router.post('/:gradeId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Add_Allowance_to_Grade);

    
//UPDATE
router.put('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.Update_Allowances),


    ///DELETE
    router.delete('/:employeeId/:id',
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
router.post('/:employeeId/:allowanceId', allowanceController.addExistingAllowances);

//DELETE Allowance
router.delete('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.deleteAllowance);


module.exports = router;
