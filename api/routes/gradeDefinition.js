const gradeDefinition=require('../controllers/gradeDefinition.js');
const middleware=require('../middleware/auth.js')
const express = require("express");
const router = express.Router();

router.post("/",
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
gradeDefinition.add_new_Grade);


router.get('/',
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
gradeDefinition.get_All_Grade);

router.get('/:id',
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
gradeDefinition.get_single_Grades);

router.delete("/:id",
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
gradeDefinition.delete_Grades);


router.put("/:id",
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
    gradeDefinition.updateGrades);



router.put("/:gradeId/:allowanceId",
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
    gradeDefinition.Update_Allowances_and_GradeDefn);


module.exports = router;