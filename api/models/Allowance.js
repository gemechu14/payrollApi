const mongoose = require('mongoose');

const AllowanceSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  month: { type: String },
  year: { type: String },
});

module.exports = mongoose.model('Allowance', AllowanceSchema);
