const mongoose = require('mongoose');

const providentFundmodel = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  Employer_contribution: {
    type: String,
    required: true,
  },
  Employee_contribution: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('ProvidentFund', providentFundmodel);
