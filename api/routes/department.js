const express = require('express');
const router = express.Router();
const deptController = require('../controllers/department.js');
const middleware=require('../middleware/auth.js')
//CREATE
router.post('/', 
middleware.protect,
middleware.restrictTo('Companyadmin'),

deptController.add_dept);
//UPDATE
router.put('/:id', deptController.updateDept),
  //DELETE
  router.delete('/:id', deptController.delete_Dept);

//GET SINGLE Dept
router.get('/find/:id', deptController.get_singe_Dept);
//GET ALL Depts
router.get('/', deptController.get_All_Dept);

//SEARCH
router.get('/:key',deptController.searchDepartment)
module.exports = router;
