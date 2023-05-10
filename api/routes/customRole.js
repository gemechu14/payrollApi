const express = require("express");
const router = express.Router();
const roleController = require("../controllers/customRole.js");
const middleware = require("../middleware/auth.js");
//CREATE
router.get(
  "/",
  middleware.protect,
  middleware.restrictTo("Companyadmin"),
  roleController.get_All_Role
);

router.post(
  "/",
  middleware.protect,
  middleware.restrictTo("Companyadmin"),
  roleController.add_new_Role
);

router.delete(
  "/:roleId",
  middleware.protect,
  middleware.restrictTo("Companyadmin"),
  roleController.delete_Role
);

//UPDATE
router.put(
  "/:employeeId/:roleId",
  middleware.protect,
  middleware.restrictTo("Companyadmin"),
  roleController.addExistingRoleToEmployee
),
  //     //DELETE

  // //GET ONE
  // router.get('/find/:id',
  //     middleware.protect,
  //     middleware.restrictTo('Companyadmin'),

  //     roleController.get_single_Deduction);
  // //GET ALL
  // router.get('/',

  //     middleware.protect,
  //     middleware.restrictTo('Companyadmin'),
  //     roleController.get_All_Deduction);

  // //ADD EXISTING ALLOWANCE TO EMPLOYEE
  // router.post('/:employeeId/:deductionId',
  //     middleware.protect,
  //     middleware.restrictTo('Companyadmin'),

  //     roleController.addExistingDeduction
  // );

  // //ADD EXISTING ALLOWANCE TO ALL EMPLOYEE
  // router.put('/:deductionId',
  //     middleware.protect,
  //     middleware.restrictTo('Companyadmin'),
  //     roleController.addExistingDeductionToAllEmployee
  // );

  // //ADD EXISTING ALLOWANCE TO ALL EMPLOYEE  UNDER SPECIFIC DEPARTMENT
  // router.put('/addToDepartment/:departmentId/:deductionId',
  //     middleware.protect,
  //     middleware.restrictTo('Companyadmin'),
  //     roleController.addExistingDeductionToAllEmployee
  // );
  (module.exports = router);
