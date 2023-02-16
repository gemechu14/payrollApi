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
  companyId:{
    type:String
  },
  //PROVIDENT FUND

 type: {
    type: String,
    enum:['Percentage','Amount']
    
  },
  employeer_Contribution: {
    type: String,
   
  },
  employee_Contribution: {
    type: String,
    
  },

  //TAX EXAMPTION
  taxable_income_limit: {
    type: String,
  },
  exampt_age_limit: {
    type: String,
  },
  exampt_percentage: {
    type: String,
  },

});
module.exports = mongoose.model('Payroll', payrollmodel);
