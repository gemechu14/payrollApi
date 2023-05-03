const mongoose = require('mongoose');

const AllowanceSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, default: 0 },
    isTaxable: { type: Boolean, default: false },
    percent: { type: Number, default: 0 },
    netAmount: { type: Number, default: 0 },
    description: { type: String },
     taxable_income_limit: {
    type: String,
  },

    companyId: { type: String }
});

module.exports = mongoose.model('GradeAllowance', AllowanceSchema);
