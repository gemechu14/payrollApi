const mongoose = require('mongoose');

const defineSubscriptionSchema = mongoose.Schema({
  name: { type: String, enum: ['Monthly', 'Annual', 'Unlimited'] },
  no_Of_Employee: {
    range: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description:{
    type:String,

},
discount:{
    type:Number,
    default:0
}
});
module.exports = mongoose.model('Package', defineSubscriptionSchema);