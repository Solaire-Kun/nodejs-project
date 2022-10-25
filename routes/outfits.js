const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const Order = require('../models/Order');
const User = require('../models/User');

// Get All Outfits
router.get('/', async (req, res) => {
    try {
        const outfitsList = await Outfit.find();
        res.json(outfitsList).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Get Outfit By ID
router.get('/:outfitId', async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.outfitId);
        if (outfit == null) {
            res.json('Outfit not found').status(404);
        } else {
            res.json(outfit).status(201);
        };
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Create New Outfit
router.post('/', async (req, res) => {
    const outfit = new Outfit({
        outfitName: req.body.outfitName,
        size: req.body.size,
        pictures: req.body.pictures,
        brand: req.body.brand
    });
    try {
        const createOutfit = await outfit.save();
        res.json(createOutfit).status(201);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Update Outfit Information
router.patch('/:outfitId', async (req, res) => {
    try {
        const updateOutfit = await Outfit.updateOne({ _id: req.params.outfitId }, {
            $set: {
                outfitName: req.body.outfitName,
                size: req.body.size,
                pictures: req.body.pictures,
                brand: req.body.brand
            }
        });
        res.json(updateOutfit).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

// Delete Outfit
router.delete('/:outfitId', async (req, res) => {
    try {
        Outfit.findById(req.params.outfitId)
            .then(outfit => {
                if (outfit && outfit.orderId === null) {
                    outfit.deleteOne();
                    res.json('Outfit successfully deleted!').status(202);
                } else if (outfit && outfit.orderId !== null) {
                    Order.findById(outfit.orderId)
                        .then(order => {
                            order.updateOne({ $pull: { outfitId: outfit._id } })
                                .then(() => {
                                    if (order.outfitId.length <= 1) {
                                        order.deleteOne();
                                        outfit.deleteOne();
                                        User.findById(order.userId)
                                            .then(user => {
                                                user.$set({ orderId: null }).save();
                                                res.json('Outfit and Order successfully deleted!').status(202);
                                            });
                                    } else {
                                        outfit.deleteOne();
                                        res.json('Outfit successfully deleted!').status(202);
                                    };
                                });
                        });
                } else {
                    res.json('Outfit not found').status(404);
                };
            });
    } catch (err) {
        res.json({ message: err }).status(404);
    };
});

module.exports = router;