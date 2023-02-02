const packageController = require('../controllers/Package.js');
const express = require("express");
const router = express.Router();

router.post("/", packageController.createPlan);
router.get("/", packageController.listPlan);
router.post('/:packageId',packageController.updatePackage);

router.delete('/:id',packageController.deletePackage);

module.exports = router;