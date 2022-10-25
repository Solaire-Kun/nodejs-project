const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const User = require('../models/User');
const Order = require('../models/Order');

// Get All Orders
router.get('/', async (req, res) => {
    try {
        const ordersList = await Order.find();
        res.json(ordersList).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Get Order By ID
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order == null) {
            res.json('Order not found').status(404);
        } else {
            res.json(order).status(200);
        };
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Create New Order
router.post('/', async (req, res) => {
    try {
        await Outfit.find({ _id: req.body.outfitId })
            .then(outfit => {
                User.findById(req.body.userId)
                    .then(user => {
                        if (!user) {
                            res.json({ message: 'User not found.' }).status(404);
                        } else {
                            const item = [];
                            const order = new Order({
                                outfitId: item,
                                userId: req.body.userId
                            });
                            user.$set({ orderId: order._id }).save();

                            for (let i = 0; i < outfit.length; i++) {
                                outfit[i].$set({ orderId: order._id }).save()
                                item.push(outfit[i]._id)
                            };
                            order.$set({ outfitId: item }).save();
                            res.json(order).status(201);
                        };
                    });
            });
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Update Order Information
router.patch('/:orderId', async (req, res) => {
    try {
        await Order.findById(req.params.orderId)
            .then(order => {
                if (!order) {
                    res.json({ message: 'Order not found' }).status(404);
                } else {
                    Outfit.find({ _id: req.body.outfitId })
                        .then(outfit => {
                            if (!outfit) {
                                res.json({ message: 'Outfit not found' }).status(404);
                            } else {
                                const item = [];
                                const updateOrder = order.$set({
                                    outfitId: item
                                });
                                for (let i = 0; i < outfit.length; i++) {
                                    outfit[i].$set({ orderId: order._id }).save()
                                    item.push(outfit[i]._id)
                                };
                                updateOrder.$set({ outfitId: item }).save();
                                res.json(updateOrder).status(200);
                            };
                        });
                };
            });
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Delete Order
router.delete('/:orderId', (req, res) => {
    try {
        Order.findById(req.params.orderId)
            .then(order => {
                if (!order) {
                    res.json({ message: 'Order not found' }).status(404);
                } else {
                    Outfit.find({ _id: order.outfitId })
                        .then(outfit => {
                            for (let i = 0; i < outfit.length; i++) {
                                outfit[i].$set({ orderId: null }).save()
                            };
                            User.findById(order.userId)
                                .then(user => {
                                    user.$set({ orderId: null }).save();
                                    order.deleteOne();
                                    res.json('Order successfully deleted!').status(202);
                                });
                        });
                };
            });
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

module.exports = router;