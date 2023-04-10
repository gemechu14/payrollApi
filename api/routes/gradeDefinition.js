const gradeDefinition=require('../controllers/gradeDefinition.js');
const middleware=require('../middleware/auth.js')
const express = require("express");
const router = express.Router();

router.post("/",
middleware.protect,
middleware.restrictTo('Companyadmin'),
gradeDefinition.add_new_Grade);


router.get('/',
middleware.protect,
middleware.restrictTo('Companyadmin'),
gradeDefinition.get_All_Grade);

router.get('/:id',
middleware.protect,
middleware.restrictTo('Companyadmin'),
gradeDefinition.get_single_Grades);

router.delete("/:id",
middleware.protect,
middleware.restrictTo('Companyadmin'),
gradeDefinition.delete_Grades);


router.put("/:id",
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    gradeDefinition.updateGrades);



router.put("/:gradeId/:allowanceId",
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    gradeDefinition.Update_Allowances_and_GradeDefn);


module.exports = router;