const mongoose =require('mongoose');
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    CompanyCode:{
      type:String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
     
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive:{
      type:Boolean,
      default:false
    }
   
  },
  { timestamps: true }
);

module.exports=mongoose.model("User1", UserSchema);  