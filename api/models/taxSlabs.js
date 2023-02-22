const mongoose = require('mongoose');

const taxSlabmodel = mongoose.Schema({
  // payrollID: {
  //   type: String,
  //   required: true,
  // },
  from_Salary: {
    type: String,
    required: true,
    unique:true
  },
  to_Salary: {
    type: String,
    required: true,
    unique:true
  },
 

  income_tax_payable: {
    type: String,
    required:true
  },
deductible_Fee:{
  type: String,
  
},
companyId:{
  type:String
} 
  

});
module.exports = mongoose.model('TaxSlab', taxSlabmodel);
