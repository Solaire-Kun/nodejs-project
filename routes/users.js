const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Get All Users
router.get('/', async (req, res) => {
    try {
        const usersList = await User.find();
        res.json(usersList);
    } catch(err) {
        res.json({ message:err });
    };
});

// Get User By ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    };
});

// Create New User
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        orders: req.body.orders
    });

    try {
        const createUser = await user.save();
        res.json(createUser);
    } catch(err) {
        res.json({ message: err });
    };
});

// Update User Information
router.patch('/:userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.userId }, { $set: {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            orders: req.body.orders
        }})
        res.json(updateUser);
    } catch(err) {
        res.json({ message: err }); 
    };
})

// Delete User
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.userId });
        res.json(deletedUser);
    } catch(err) {
        res.json({ message: err });
    };
});


module.exports = router;