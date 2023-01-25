const trialController = require('../controllers/trial.js');
const express = require("express");
const router = express.Router();
const middleware=require('../middleware/auth.js')

router.post("/",middleware.protect,middleware.restrictTo('superAdmin'), trialController.createPlan);
router.get("/", trialController.listPlan);


module.exports = router;