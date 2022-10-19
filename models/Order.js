const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    outfitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outfits',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Orders', OrderSchema);