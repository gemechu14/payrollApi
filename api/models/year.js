const mongoose=require('mongoose');

const yearSchema=mongoose.Schema({
name:String,
companyId:String,
month:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'month',
    // required: true

}],

})
module.exports=mongoose.model('year',yearSchema)