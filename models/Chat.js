const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the chat model to be used in server database as a collection
const chatSchema = new Schema({
    from: {
        type: String,
        required: true,
        ref: 'user'
    },
    to: {
        type: String,
        required: true,
        ref: 'user'
    },
    message: [{
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