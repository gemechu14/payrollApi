const express = require('express');
const router = express.Router();

const payrollApprovalController = require('../controllers/payrollApproverContoroller.js');

router.get('/payrollApproval/', payrollApprovalController.getPayrollApprovals);
router.get('/payrollApproval/:id', payrollApprovalController.getPayrollApprovalById);
router.post('/payrollApproval/new/', payrollApprovalController.createPayrollApproval);
router.put('/payrollApproval/update/:id', payrollApprovalController.updatePayrollApproval);
router.delete('/payrollApproval/delete/:id', payrollApprovalController.deletePayrollApproval);
router.put('/approvepayroll/:payrollId/:approverId', payrollApprovalController.approveMyPayroll)
module.exports = router;
