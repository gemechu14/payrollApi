const upload=require('../controllers/imageUploads.js');
const express=require('express');
const router=express.Router();
router.post('/',upload.single('avatar'))
module.exports=router;