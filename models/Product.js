const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    pictures: {
        type: Number,
        required: true
    },
    insertionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', ProductSchema);