const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the chat model to be used in server database as a collection
const chatSchema = new Schema({
    between: {
        type: String,
        required: true
    },
    message: [{
        user: {
            type: String,
        },
        data: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
});

// name of the collection is 'chat'
module.exports = mongoose.model('chat', chatSchema);