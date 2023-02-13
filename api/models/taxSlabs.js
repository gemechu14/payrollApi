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
  type: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required:true
  },

});
module.exports = mongoose.model('TaxSlab', taxSlabmodel);
