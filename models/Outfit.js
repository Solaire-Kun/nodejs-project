const mongoose = require('mongoose');

const OutfitSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    insertionDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Outfits', OutfitSchema);