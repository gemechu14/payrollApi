const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const verifyUser = require('../middleware/userAuth.js');
const adminAuth = require('../middleware/adminAuth.js');
const verifyToken = require('../middleware/verifyToken.js');
const auth = require('../middleware/checkAuth.js');
const userAuth = require('../middleware/userAuth.js');

router.get('/check/:id', verifyToken.verifyToken, (req, res, next) => {
  try {
    res.status(200).json({
      message: 'user is authorized',
    });
  } catch (error) {
    res.status(404).json({
      message: 'user is not authorized',
    });
  }
});
// router.get('/checku/:id', verifyUser, (req, res, next) => {
//   try {
//     res.status(200).json({
//       message: 'user is authorized',
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: 'user is not authorized',
//     });
//   }
// });

// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello');
// });


//GET ALL USERS
router.get('/', userController.getUsers);
//UPDATE
router.put('/:id', userAuth,userController.updateUser);
//DELETE
router.delete('/:id', adminAuth,userController.deleteUser);
router.get('/:id', adminAuth,userController.getUser);




module.exports = router;



