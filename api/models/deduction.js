const mongoose = require('mongoose');
const deductionSchema = mongoose.Schema({
  name: { type: String, required: true ,unique:true},
  amount: { type: String, required: true,default:'0' },
  isTaxable:{ type:Boolean, default:false },
  month: { type: String,},
  year: { type: String, },
  description:{type:String},
  companyId:{type:String},
});



module.exports = mongoose.model('Deduction', deductionSchema);
