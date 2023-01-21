const subscriptionController=require('../controllers/subscription.js');
const express=require('express');
const router=express.Router();

router.post('/trialSubscription',subscriptionController.trialSubscription);
router.put( '/packageSubscription/:packageId',
subscriptionController.protect,
subscriptionController.packageSubscription);

module.exports=router;