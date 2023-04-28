const express = require('express');
const router = express.Router();
const idformatController = require('../controllers/id_format.js');
const middleware = require('../middleware/auth.js')
//ADD ALLOWANCE
router.post('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    idformatController.add_new_idFormat
    );

// //CREATE
// router.post('/:employeeId',
//     middleware.protect,
//     middleware.restrictTo('Companyadmin'),
//     idformatController.Create_Allowances);
//UPDATE
router.put('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    idformatController.updateIDFormat),
    // ///DELETE
    // router.delete('/:employeeId/:id',
    //     middleware.protect,
    //     middleware.restrictTo('Companyadmin'),
    //     idformatController.delete_Allowances);

// //GET ONE
// router.get('/:id',
//     middleware.protect,
//     middleware.restrictTo('Companyadmin'),
//     idformatController.get_single_Allowance);
//GET ALL 
router.get('/',

    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    idformatController.get_All_Id_format);

//ADD EXISTING ALLOWANCE TO EMPLOYEE
// router.post('/:employeeId/:allowanceId', idformatController.addExistingAllowances);

//DELETE 
router.delete('/:id',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    idformatController.deleteIDFormat);


module.exports = router;
