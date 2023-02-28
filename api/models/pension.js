const mongoose = require('mongoose');

const pensionSchema = mongoose.Schema({
employeeContribution:{type:String},
employerContribution:{type:String}

});

module.exports = mongoose.model('pensionSchema', pensionSchema);
