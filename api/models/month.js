const mongoose=require('mongoose');

const monthSchema=mongoose.Schema({
    name:String,
    companyId:String,

})
module.exports=mongoose.model('month',monthSchema)