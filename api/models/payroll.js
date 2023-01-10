const mongoose = require('mongoose');

const payrollmodel = mongoose.Schema({
  payrollID: {
    type: String,
    required: true,
  },
  payrollName: {
    type: String,
    required: true,
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
  //PROVIDENT FUND

//  type: {
//     type: String,
//     required: true,
//   },
//   Employer_contribution: {
//     type: String,
//     required: true,
//   },
//   Employee_contribution: {
//     type: String,
//     required: true,
//   },

//   //TAX EXAMPTION
//   income_limit: {
//     type: String,
//   },
//   age_limit: {
//     type: String,
//   },
//   Exampt_percentage: {
//     type: String,
//   },
});
module.exports = mongoose.model('Payroll', payrollmodel);
