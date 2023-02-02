const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller.js');
const middleware=require('../middleware/auth.js');
const sendEmail=require('../utils/email.js')
//Registration
router.post('/companyRegistration', authcontroller.signup);

//Trial registration
router.post('/trialRegistration',authcontroller.trialRegistration);
//PACKAGE SUBSCRIPTION
router.post('/packageRegistration/:packageId',authcontroller.packageRegistration);
router.post('/companyLogin', authcontroller.login);
//GET ALL COMPANY
router.get(
  '/getAllCompany',
  middleware.protect,
  middleware.restrictTo('superAdmin'),
  // authcontroller.restrictTo('superAdmin'),
  authcontroller.getAllCompany
);


router.put(
  '/updateCompany/:email',
  middleware.protect,
  middleware.restrictTo('superAdmin'),
  // authcontroller.restrictTo('superAdmin'),
  authcontroller.updateCompany
);


//Send Email



router.get(
  '/searchByQuery',
  middleware.protect,
  middleware.restrictTo('superAdmin'),
  // authcontroller.restrictTo('superAdmin'),
  authcontroller.querySearch
);



//BLOCK COMPANY
router.post(
  '/blockCompany',
  middleware.protect,
  middleware.restrictTo('superAdmin'),

  authcontroller.blockCompany
);

//GET ALL BLOCKED COMPANY
router.get(
  '/blockedCompany',
  middleware.protect,
  middleware.restrictTo('superAdmin'),

  authcontroller.getAllBlockedCompany
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


router.post('/sendEmail',authcontroller.sendEmail);
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
  .patch(middleware.protect, authcontroller.updateMe);
router
  .route('/deleteMe')
  .delete(middleware.protect, authcontroller.deleteMe);

  router.get('/logout',authcontroller.logout);
module.exports = router;
