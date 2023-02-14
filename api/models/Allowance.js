const mongoose = require('mongoose');

const AllowanceSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true ,default:0},
  month: { type: String },
  year: { type: String },
  description:{type:String},
  companyId:{type:String}
});

module.exports = mongoose.model('Allowance', AllowanceSchema);
