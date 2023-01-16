const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller.js');

router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);
router.get(
  '/token',
  authcontroller.protect,
  authcontroller.restrictTo('user'),
  authcontroller.getAllUser
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
