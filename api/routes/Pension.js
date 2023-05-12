const express = require('express');
const router = express.Router();
const allowanceController = require('../controllers/Allowance.js');
const middleware = require('../middleware/auth.js');

const pensionController = require('../controllers/pension.js')
//ADD 
router.post('/',
    middleware.protectAll,
    middleware.restrictToAll('superAdmin'),
    pensionController.add_Pension);


//UPDATE
router.put('/:id',
    middleware.protectAll,
    middleware.restrictToAll('superAdmin'),
    pensionController.updatePension1),
    ///DELETE
    router.delete('/:id',
        middleware.protectAll,
        middleware.restrictToAll('superAdmin', 'Companyadmin'),
        pensionController.delete_pension);


//GET ALL 
router.get('/',
    middleware.protectAll,
    middleware.restrictToAll('superAdmin', 'Companyadmin'),
    pensionController.get_All_pension);

//GET ONE
router.get('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    allowanceController.get_single_Allowance);

module.exports = router;
