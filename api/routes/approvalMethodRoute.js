 const express = require('express');
const router = express.Router();
const approvalMethodController = require('../controllers/ApprovalMethodController.js');

router.get('/approvalMethod/', approvalMethodController.getAllApprovalMethod);
router.post('/approvalMethod/new/', approvalMethodController.createApprovalMethod);
router.get('/approvalMethod/:id', approvalMethodController.getApprovalMethodById);
router.put('/approvalMethod/update/:id', approvalMethodController.updateApprovalMethodById);
router.delete('/approvalMethod/delete/:id', approvalMethodController.deleteApprovalMethodById);
router.get('/getAll',approvalMethodController.get1AllApprovalMethod);
router.put('/approvalMethod/:id',approvalMethodController.update_ApprovalMethod)

module.exports = router;