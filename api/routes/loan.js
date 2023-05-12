const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanContorollers.js');
const middleware = require('../middleware/auth.js')
//CREATE
router.post('/',

    middleware.protect,
    middleware.restrictTo({ deduction: "write" }),
    loanController.add_loan
);


// router.post('/:employeeId',
//     middleware.protect,
//     middleware.restrictTo('Companyadmin'),
//     loanController.Create_Loan);


//UPDATE
router.put('/:employeeId/:id',
    middleware.protect,
    middleware.restrictTo({ deduction: "update" }),
    loanController.updateLoan),



    //DELETE
    router.delete('/:employeeId/:id',
        middleware.protect,
        middleware.restrictTo({ deduction: "delete" }),
        loanController.delete_laon);

//GET ONE
router.get('/find/:id',
    middleware.protect,
    middleware.restrictTo({ deduction: "read" }),
    loanController.get_one);
//GET ALL 
router.get('/',

    middleware.protect,
    middleware.restrictTo({ deduction: "read" }),
    loanController.get_All_loan);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.put('/add/:employeeId/:id',
    middleware.protect,
    middleware.restrictTo({ deduction: "update" }),
    loanController.addExistingLoanToEmployee
);


module.exports = router;
