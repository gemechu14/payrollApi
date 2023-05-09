const mongoose = require('mongoose');

const AllowanceSchema = mongoose.Schema({
    name: { type: String, required: true,},
    amount: { type: Number, required: true, default: 0 },
    isTaxable: { type: Boolean, default: false },
    percent: { type: Number, default: 0 },
     is_Exempted: { type: Boolean, default:false},
    exempted_on_Allowance_amount: { type: Number,  default: 0 },
    starting_from: { type: Number, default: 0 },
    netAmount: { type: Number, default: 0 },
    description: { type: String },
     taxable_income_limit: {
    type: String,
    
  },
 
    companyId: { type: String }
});

module.exports = mongoose.model('GradeAllowance', AllowanceSchema);
