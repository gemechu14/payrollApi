const mongoose = require('mongoose');

const loandefinitionSchema = mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String },
    companyId: { type: String }
});

module.exports = mongoose.model('LoanDefinition', loandefinitionSchema);
