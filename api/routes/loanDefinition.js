const express = require('express');
const router = express.Router();
const loandefinitionController = require('../controllers/loanDefinition.js');
const middleware = require('../middleware/auth.js')
//CREATE
router.post('/',

    middleware.protect,
    middleware.restrictTo('Companyadmin'),
loandefinitionController.add_loan
    );


router.post('/:employeeId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    loandefinitionController.get_All_loan);


//UPDATE
router.put('/:employeeId/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),


    loandefinitionController.add_loan),
    //DELETE
    router.delete('/:employeeId/:id',
        middleware.protect,
        middleware.restrictTo('Companyadmin'),
        loandefinitionController.add_loan);

//GET ONE
router.get('/find/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),

    loandefinitionController.add_loan);
//GET ALL 
router.get('/',

    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    loandefinitionController.add_loan);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
router.post('/:employeeId/:deductionId',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),

    loandefinitionController.add_loan
);


module.exports = router;
