const express = require('express');
const router = express.Router();
const deptController = require('../controllers/department.js');
const middleware=require('../middleware/auth.js')
//CREATEh
router.post('/', 
  middleware.protectAll,
  middleware.restrictToAll('Companyadmin'),

deptController.add_dept);
//UPDATE
router.put('/:id', 
  middleware.protectAll,
  middleware.restrictToAll('Companyadmin'),
deptController.updateDept),
  //DELETE
  router.delete('/:id', 
    middleware.protectAll,
    middleware.restrictToAll('Companyadmin'),
  deptController.delete_Dept);

//GET SINGLE Dept
router.get('/find/:id', 
  middleware.protectAll,
  middleware.restrictToAll('Companyadmin'),

deptController.get_singe_Dept);
//GET ALL Depts
router.get('/',
  middleware.protectAll,
  middleware.restrictToAll('Companyadmin'),
deptController.get_All_Dept);

//SEARCH
router.get('/:key', middleware.protectAll,
  middleware.restrictToAll('Companyadmin'), 
  deptController.searchDepartment)
module.exports = router;
