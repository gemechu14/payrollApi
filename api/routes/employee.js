const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employee.js');
const middleware = require('../middleware/auth.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//upload.single('images'),
router.post(
  '/',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  upload.single('images'),
  employeeController.add_employee
);


//UPDATE
router.put('/:employeeId', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.updateEmployee),

  //DELETE
router.delete('/:key', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.delete_Employee);

//GET ONE
router.get(
  'find/:id',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.get_single_Employee
);
//GET ALL
router.get(
  '/',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.get_All_Employee
);

router.get('/department/:departmentId', 
middleware.protect,
middleware.restrictTo('Companyadmin'),
employeeController.get_By_Department);
//SEARCH EMPLOYEE

router.get(
  '/searchAllEmployee/:key',
  middleware.protect,
  middleware.restrictTo('Companyadmin'),
  employeeController.searchAllEmployee
);
module.exports = router;
