const mongoose = require('mongoose');

const taxExamptionDateModel = mongoose.Schema({
  income_limit: {
    type: String,
  },
  age_limit: {
    type: String,
  },
  Exampt_percentage: {
    type: String,
  },
});
module.exports = mongoose.model('TaxExaptionDate', taxExamptionDateModel);
