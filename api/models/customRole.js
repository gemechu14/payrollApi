const mongoose = require('mongoose');

const customRoleSchema = mongoose.Schema({
    name: { type: String, required: true, },
    permissionType: { type: String },
    role: { type: String },
    description: { type: String },
    companyId: { type: String }
});

module.exports = mongoose.model('customRole', customRoleSchema);
