const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
  name: { type: String, enum: ['Monthly', 'Annual', 'Unlimited'] },

  min_number_of_Emp:{
    type:String
  },
  max_number_of_Emp:{
    type:String
  },
  price: {
    type: Number
  },
  description:{
    type:String,

},
discount:{
    type:Number,
    default:0
},

services:[
  String]

});
module.exports = mongoose.model('Package', packageSchema);