const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  deptName: {
    type: String,
    required: true,
   
   unique: true,
  },

  
  location: {
    type: String,
    required:true
  },
 
});

module.exports = mongoose.model('Department', departmentSchema);
