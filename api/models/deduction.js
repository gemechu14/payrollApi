const mongoose = require('mongoose');
const deductionSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
});

module.exports = mongoose.model('Deduction', deductionSchema);
