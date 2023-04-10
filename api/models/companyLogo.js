const mongoose =require('mongoose');


const companyLogoSchema=mongoose.Schema({
  companyID:String,
    images: {
        type: String,
      }
})

module.exports=mongoose.model("companyLogo",companyLogoSchema);