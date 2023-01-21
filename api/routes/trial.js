const trialController = require('../controllers/trial.js');
const express = require("express");
const router = express.Router();

router.post("/", trialController.createPlan);
router.get("/", trialController.listPlan);


module.exports = router;