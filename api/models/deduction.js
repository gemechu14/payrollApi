const mongoose = require('mongoose');
const deductionSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  month: { type: String,},
  year: { type: String, },
});

module.exports = mongoose.model('Deduction', deductionSchema);
