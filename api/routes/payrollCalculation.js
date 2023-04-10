const express=require('express');
const router=express.Router();
const payrollCalculation=require('../controllers/payrollCalculation.js');



router.put('/payrollCalc',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    payrollCalculation.payrollCalculation);
    