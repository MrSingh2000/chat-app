const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the details model to be used in server database as a collection
const detailsSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'user'
    },
    bio: {
        type: String,
        default: ""
    },
    pic: {
        type: String,
        default: ""
    },
    status: [{
        data: String,
        contentType: String,
        default: ""
    }]
});

// name of the collection is 'details'
module.exports = mongoose.model('details', detailsSchema);