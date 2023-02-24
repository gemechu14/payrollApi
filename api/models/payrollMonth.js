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
    type:String  },

    name:{type:String,
      required:true}

});

module.exports = mongoose.model('PayrollMonth', payrollMonthSchema);
