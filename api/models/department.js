const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  deptName: {
    type: String,
    required: true,
  },

  
  location: {
    type: String,
  },
 
});

module.exports = mongoose.model('Department', departmentSchema);
