const mongoose =require('mongoose');


const moduleSchema= mongoose.Schema({

    name: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
 company

});

const userRoles = mongoose.model('UserRole',userRoleSchema);
module.exports = userRoles;