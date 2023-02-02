const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
  name: { type: String, enum: ['Monthly', 'Annual', 'Unlimited'] },
  no_Of_Employee: {
    range: String,
    
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

services:[{
  type:String
}]

});
module.exports = mongoose.model('Package', packageSchema);