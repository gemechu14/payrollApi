const mongoose = require('mongoose');

const trialModel = mongoose.Schema({
  for: {
    type: Number,
  }
});

module.exports = mongoose.model('Trial', trialModel);
