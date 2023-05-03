const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: String, required: true, default: 0 },
    isInterestFree: { type: Boolean, default: false },
    returnPeriod: { type: String },    
    interest: { type: String },
    returnedAmount:{type:String},
    description: { type: String },
    companyId: { type: String }
});

module.exports = mongoose.model('Loan', loanSchema);
