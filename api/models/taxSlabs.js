const mongoose = require('mongoose');

const taxSlabmodel = mongoose.Schema({
  // payrollID: {
  //   type: String,
  //   required: true,
  // },
  from_Salary: {
    type: String,
    required: true,
  },
  to_Salary: {
    type: String,
    required: true,
  },
 

  income_tax_payable: {
    type: String,
    required:true
  },
deductible_Fee:{
  type: String,
  
}
  
  

});
module.exports = mongoose.model('TaxSlab', taxSlabmodel);
