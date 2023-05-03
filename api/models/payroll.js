const mongoose = require('mongoose');
const payrollmodel = mongoose.Schema({
  payrollID: {
    type: String,
    required: true,
   // unique:true
  },
  payrollName: {
    type: String,
    required: true,
   // unique: true
  },
  taxSlab: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaxSlab',
    },
  ],
  payrollYear: {
    type: String,
    required: true,
  },
  payrollMonth: {
    type: String,
    required: true,
  },
  companyId:{
    type:String
  },
  //PROVIDENT FUND

 type: {
    type: String,
    enum:['Percentage','Amount']
    
  },
 grossSalary:{type:Number,default:0},
 taxableIncome: { type: Number, default: 0 },
totalDeduction: { type: Number, default: 0 },
totalAllowance: { type: Number, default: 0 },
NetSalary: { type: Number, default: 0 },
employee_pension_amount: { type: Number, default: 0 },
employer_pension_amount: { type: Number, default: 0 },

  //TAX EXAMPTION
  // taxable_income_limit: {
  //   type: String,
  // },

  // exampt_age_limit: {
  //   type: String,
  // },

  // exampt_percentage: {
  //   type: String,
  // },
  status: {
    type: String,
    enum: ['created', 'ordered', 'pending', 'approved'],
    default: 'created'
  },
  isRollbacked: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});



//payrollmodel.index({ payrollID: 1, payrollName: 1 }, { unique: true});
module.exports = mongoose.model('Payroll', payrollmodel);
