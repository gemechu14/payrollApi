const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.js');


//INSERT EMPLOYEE
router.post('/', employeeController.Create_Employee);

//UPDATE
router.put('/:employeeId', employeeController.updateEmployee),

//DELETE
router.delete("/:id",employeeController.delete_Employee);

//GET ONE
router.get('/find/:id', employeeController.get_single_Employee);
//GET ALL 
router.get('/', employeeController.get_All_Employee);

router.get('/:departmentId',employeeController.search_By_Department);


module.exports = router;
