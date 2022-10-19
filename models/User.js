const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    orders: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Users', UserSchema);