const mongoose =require('mongoose');


const moduleSchema= mongoose.Schema({

    name: {
        type: String,
       
    },

    employeeId: [
        {
            type: mongoose.Schema.Types.ObjectId,

            ref: "Employee",
        },
    ],
    accessLevel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAccessLevel",
        },
    ],

  


    companyId:String,
    description: {
        type: String,
       
    },
 

});

const userRoles = mongoose.model('UserRole',userRoleSchema);
module.exports = userRoles;