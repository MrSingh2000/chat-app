const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the contact model to be used in server database as a collection
const contactSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'user'
    },
    bio: {
        type: String
    },
    contacts: [{
        data: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        lastChat: {
            type: String
        }
    }],
});

// name of the collection is 'contact'
module.exports = mongoose.model('contact', contactSchema);