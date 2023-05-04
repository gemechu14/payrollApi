const packageController = require('../controllers/Package.js');
const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth.js')

router.post("/", packageController.createPlan





);
router.get("/",
    middleware.protectUser,
    middleware.checkPermissions({ name: 'payroll' }),


    // checkPermissions({ name: 'employee' }),


    packageController.listPlan,);
router.put('/updatePackage/:id/:packageId', packageController.updateEmployeePackageSubscription);
router.post('/:packageId', packageController.updatePackage);
router.get('/getleftDays/:id', packageController.getleftDays);
router.delete('/:id', packageController.deletePackage);
router.get('/subs/:id', packageController.getSubscription);

function checkPermissions(permission) {

    // console.log('per', permission.name)
    return function (req, res, next) {
        // console.log(req.user)
        console.log('hello', req.user.role)
        if (req.user.role === 'employee') {
            // Get the user's permissions from the database
            const userPermissions = req.user.permissions;

            // console.log("userPermissions", userPermissions);
            console.log("permission", userPermissions[`${permission.name}`].view)
            // console.log("first",userPermissions[permission])
            // Check if the user has the required permission
            if (userPermissions[`${permission.name}`].view) {
                // User has permission, allow access to the route
                next();
            } else {
                // User does not have permission, deny access to the route
                res.status(403).send('Access denied');
            }
        } else {
            next()
        }
    }
}


module.exports = router;