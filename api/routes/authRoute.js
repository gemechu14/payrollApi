const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller.js');

router.post('/companyRegistration', authcontroller.signup);
router.post('/companyLogin', authcontroller.login);
//GET ALL COMPANY
router.get(
  '/getAllCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllCompany
);
//GET PENDING COMPANY
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
//SEARCH COMPANY
router.get(
  '/searchCompanyByName/:name',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.searchCompanyByName
);

//APPROVE COMPANY
router.post(
  '/approveCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.approveCompany
);

//UNAPPROVE COMPANY
router.post(
  '/unapproveCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.unApproveCompany
);

//APPROVE COMPANY PAYMENT
router.post(
  '/approveCompanyPayment',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.approveCompanyPayment
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
