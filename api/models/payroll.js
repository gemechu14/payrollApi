const mongoose = require('mongoose');

const payrollmodel = mongoose.Schema({
  
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  
  payrollName: {
    type: String,
  
  },
   month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  taxSlab: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaxSlab',
    },
  ],
 
  date: String,
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
incomeTax: { type: Number, default: 0 },
totalDeduction: { type: Number, default: 0 },
totalAllowance: { type: Number, default: 0 },
NetSalary: { type: Number, default: 0 },
employee_pension_amount: { type: Number, default: 0 },
employer_pension_amount: { type: Number, default: 0 },


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
   createdAt: {
    type: Date,
    default: Date.now
  },
});

//payrollmodel.index({ payrollID: 1, payrollName: 1 }, { unique: true});
module.exports = mongoose.model('Payroll', payrollmodel);
