const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  deptName: {
    type: String,
    default:'General',
    required: true,
   
//    unique: true,
  },

  
  location: {
    type: String,
    default:'location',
    required:true
  },

  companyId: {
    type: String,
  },
});

module.exports = mongoose.model('Department', departmentSchema);
