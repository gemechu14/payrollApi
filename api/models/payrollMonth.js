const mongoose = require('mongoose');

const payrollMonthSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  companyId:{
    type:String
  }

});

module.exports = mongoose.model('PayrollMonth', payrollMonthSchema);
