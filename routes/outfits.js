const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');

// Get All Outfits
router.get('/', async (req, res) => {
    try {
        const outfitsList = await Outfit.find();
        res.json(outfitsList);
    } catch(err) {
        res.json({ message:err });
    };
});

// Get Outfit By ID
router.get('/:outfitId', async (req, res) => {
    try {
        const outfit = await outfit.findById(req.params.outfitId);
        res.json(outfit);
    } catch(err) {
        res.json({ message: err });
    };
});

// Create New Outfit
router.post('/', async (req, res) => {
    const outfit = new Outfit({
        productName: req.body.productName,
        size: req.body.size,
        price: req.body.price,
        brand: req.body.brand
    });

    try {
        const createOutfit = await outfit.save();
        res.json(createOutfit);
    } catch(err) {
        res.json({ message: err });
    };
});

// Update Outfit Information
router.patch('/:outfitId', async (req, res) => {
    try {
        const updateOutfit = await Outfit.updateOne({ _id: req.params.outfitId }, { $set: {
            productName: req.body.productName,
            size: req.body.size,
            price: req.body.price,
            brand: req.body.brand
        }})
        res.json(updateOutfit);
    } catch(err) {
        res.json({ message: err }); 
    };
})

// Delete Outfit
router.delete('/:outfitId', async (req, res) => {
    try {
        const deletedOutfit = await Outfit.deleteOne({ _id: req.params.outfitId });
        res.json(deletedOutfit);
    } catch(err) {
        res.json({ message: err });
    };
});

module.exports = router;