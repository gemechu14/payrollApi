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

// //SEARCH COMPANY
// router.get(
//   '/getAllCompany/:key',
//   authcontroller.protect,
//   authcontroller.restrictTo('superAdmin'),
//   authcontroller.searchAllCompany
// );


//GET PENDING COMPANY
router.get(
  '/getAllPendingCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllPendingCompany
);

//SEARCH PENDING COMPANY
router.get(
  '/getAllPendingCompany/:key',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.searchPendingCompany
);

//SEARCH Active  COMPANY
router.get(
  '/getAllActiveCompany/:key',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.searchActiveCompany
);

router.get(
  '/getAllActiveCompany',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllActiveCompany
);
//SEARCH COMPANY
router.get(
  '/searchAllCompany/:key',
  authcontroller.protect,
  authcontroller.restrictTo('superAdmin'),
  authcontroller.searchAllCompany
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

  router.get('/logout',authcontroller.logout);
module.exports = router;
