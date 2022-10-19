const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const Order = require('../models/Order');

// Get All Orders
router.get('/', async (req, res) => {
    try {
        const ordersList = await Order.find();
        res.json(ordersList);
    } catch(err) {
        res.json({ message:err });
    };
});

// Get Order By ID
router.get('/:orderId', async (req, res) => {
    try {
        const order = await order.findById(req.params.orderId);
        res.json(order);
    } catch(err) {
        res.json({ message: err });
        console.log(err)
    };
});

// Create New Order
router.post('/', async (req, res) => {
    try {
        await Outfit.findById(req.body.outfitId)
        .then(product => {
            if(!product) {
                res.json({ message: 'Product not found.' });
            } else {
                const order = new Order({
                    outfitId: req.body.outfitId
                });
                order.save();
                res.json(order);
            };
        });
    } catch(err) {
        res.json({ message: err });
    };
});

// Update Order Information
router.patch('/:orderId', async (req, res) => {
    try {
        const updateOrder = await Order.updateOne({ _id: req.params.orderId }, { $set: {
            outfitId: req.body.outfitId
        }})
        res.json(updateOrder);
    } catch(err) {
        res.json({ message: err }); 
    };
})

// Delete Order
router.delete('/:orderId', async (req, res) => {
    try {
        const deletedOrder = await Order.deleteOne({ _id: req.params.orderId });
        res.json(deletedOrder);
    } catch(err) {
        res.json({ message: err });
    };
});

module.exports = router;