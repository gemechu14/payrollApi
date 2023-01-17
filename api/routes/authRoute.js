const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller.js');

router.post('/companyRegistration', authcontroller.signup);
router.post('/companyLogin', authcontroller.login);
router.get(
  '/getAllCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllCompany
);
router.get(
  '/getAllPendingCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllPendingCompany
);
router.get(
  '/getAllActiveCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllActiveCompany
);

router.post('/forgetPassword', authcontroller.forgotPassword);
router.route('/resetPassword/:token').patch(authcontroller.resetPassword);
router.route('/updateMyPassword').patch(authcontroller.updatePassword);
router
  .route('/updateMe')
  .patch(authcontroller.protect, authcontroller.updateMe);
router
  .route('/deleteMe')
  .delete(authcontroller.protect, authcontroller.deleteMe);
module.exports = router;
