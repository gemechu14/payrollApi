const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayrollApprovalSchema = new Schema({

    payroll_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payroll',
        unique: false,
    },
    approver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Approver',

    },
    level: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approved_date: {
        type: Date
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
});

const PayrollApproval = mongoose.model('PayrollApproval', PayrollApprovalSchema);
module.exports = PayrollApproval;
