const packageController = require('../controllers/Package.js');
const express = require("express");
const router = express.Router();

router.post("/", packageController.createPlan);
router.get("/", packageController.listPlan);
router.post('/:packageId',packageController.updatePackage);


module.exports = router;