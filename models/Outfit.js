const mongoose = require('mongoose');

const OutfitSchema = mongoose.Schema({
    outfitName: {
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
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        default: null
    },
    insertionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Outfits', OutfitSchema);