const mongoose=require('mongoose');
const imageSchema=mongoose.Schema({
    avater:{
        type:String
    }
})
module.exports=mongoose.model('Image',imageSchema);