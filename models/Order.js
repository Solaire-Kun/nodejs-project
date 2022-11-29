const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    productId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Outfits',
        required: true
    },
    userId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', OrderSchema);