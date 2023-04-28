const mongoose = require('mongoose');
const IDSchema = mongoose.Schema({
    prefix: { type: String, required: true, },
    description: { type: String },
    companyId: { type: String },
});



module.exports = mongoose.model('IDSchema', IDSchema);
