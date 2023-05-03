const mongoose = require('mongoose');

const approvalMethodSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    minimumApprover: {
        type: Number,
        required: true,

    },
    approvalLevel: {
        type: Number,
        required: true
    },
    approvalMethod: {
        type: String,
        enum: ['hierarchy', 'horizontal'],
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    lastUpdated: {
        type: Date,
        default: Date.now

    },
});

const ApprovalMethod = mongoose.model('ApprovalMethod', approvalMethodSchema);

module.exports = ApprovalMethod;


