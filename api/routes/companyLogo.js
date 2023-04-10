const companyLogo = require('../controllers/companyLogo.js');

const express = require('express');
const router = express.Router();


router.post('/',
    middleware.protect,
    middleware.restrictTo('Companyadmin'),
    companyLogo.add_Logo);

module.exports = router;