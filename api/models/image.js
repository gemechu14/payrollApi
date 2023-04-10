const mongoose=require('mongoose');
const imageSchema=mongoose.Schema({
    avater:{
        type:String
    },
    companyId:{type:string}
})
module.exports=mongoose.model('Image',imageSchema);