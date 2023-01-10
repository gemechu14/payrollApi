const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  deptName: {
    type: String,
    required: true,
  },

  deptID: {
    type: String,
  },
  location: {
    type: String,
  },
 
});

module.exports = mongoose.model('Department', departmentSchema);
