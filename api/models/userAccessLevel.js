const mongoose = require('mongoose');

const userAccessLevelModel = mongoose.Schema({
    name: {
        type: Number,
    },
    

});

module.exports = mongoose.model('UserAccessLevel', userAccessLevelModel);
