const packageController = require('../controllers/Package.js');
const express = require("express");
const router = express.Router();

router.post("/", packageController.createPlan);
router.get("/", packageController.listPlan);
router.put('/updatePackage/:id/:packageId', packageController.updateEmployeePackageSubscription);
router.post('/:packageId',packageController.updatePackage);
router.get('/getleftDays/:id', packageController.getleftDays);
router.delete('/:id',packageController.deletePackage);
router.get('/subs/:id', packageController.getSubscription);


module.exports = router;