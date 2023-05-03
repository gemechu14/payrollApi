const express = require('express');
const router = express.Router();
const approverController = require('../controllers/approverController');

// GET /approvers - get all approvers
router.get('/approvers/', approverController.getAllApprovers);

// GET /approvers - get all approvers
router.get('/approverById/', approverController.getApproverById);

// POST /approvers - create a new approver
router.post('/approver/new/', approverController.createApprover);

// PUT /approvers/:id - update an existing approver
router.put('/approver/update/:id', approverController.updateApprover);

// DELETE /approvers/:id - delete an existing approver
router.delete('/approver/delete/:id', approverController.deleteApprover);

module.exports = router;