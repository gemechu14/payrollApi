const mongoose = require('mongoose');

const customRoleSchema = mongoose.Schema({
    name: { type: String, required: true, },

    permissions: [{
        module: {
            type: String,
        // default:"employee"
        },
        read: {   
            type: Boolean,
            default: false
        },
        write: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        update: {
            type: Boolean,
            default: false
        }}]
    ,
    companyId: { type: String }
});

module.exports = mongoose.model('customRole', customRoleSchema);
