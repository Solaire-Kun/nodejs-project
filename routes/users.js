const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Outfit = require('../models/Outfit');
const Order = require('../models/Order');

// Get All Users
router.get('/', async (req, res) => {
    try {
        const usersList = await User.find();
        res.json(usersList).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Get User By ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user == null) {
            res.json('User not found').status(404);
        } else {
            res.json(user).status(200);
        };
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Create New User
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
    });
    try {
        const createUser = await user.save();
        res.json(createUser).status(201);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Update User Information
router.patch('/:userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.userId }, {
            $set: {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email
            }
        });
        res.json(updateUser).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Delete User
router.delete('/:userId', async (req, res) => {
    try {
        await User.findById(req.params.userId)
            .then(user => {
                if (!user) {
                    res.json({ message: 'User not found' }).status(404);
                } else if (user.orderId != null) {
                    Order.findById(user.orderId)
                        .then(order => {
                            if (order.outfitId != []) {
                                Outfit.find({ _id: order.outfitId })
                                    .then(outfit => {
                                        for (let i = 0; i < outfit.length; i++) {
                                            outfit[i].$set({ orderId: null }).save()
                                        };
                                        order.deleteOne();
                                        user.deleteOne();
                                        res.json('User successfully deleted!').status(202);
                                    });;
                            };
                        });
                } else {
                    user.deleteOne();
                    res.json('User successfully deleted!').status(202);
                };
            });
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

module.exports = router;