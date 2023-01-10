const express=require('express');
const router= express.Router();
const authController =require('../controllers/auth.js');
const blogin=require('../middleware/beforelogin.js');

router.post('/register',authController.register);
router.post('/login',authController.login);
module.exports=router;
