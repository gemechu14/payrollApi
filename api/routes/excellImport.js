const express = require('express');
const router = express.Router();
const { createEmployeeFile } = require('../controllers/importEmployeeController');

// route for file upload 
router.post('/file-upload', createEmployeeFile);

module.exports = router;