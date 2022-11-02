const Outfit = require('../models/Outfit');
const User = require('../models/User');
const Order = require('../models/Order');

// Get All Outfit
const outfit_get_all = async (req, res) => {
    try {
        const outfitsList = await Outfit.find();
        res.json(outfitsList).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Get Outfit By ID
const outfit_get_id = async (req, res) => {
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
};

// Create New Outfit
const outfit_post = async (req, res) => {
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
};

// Update Outfit Information
const outfit_patch = async (req, res) => {
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
};

// Delete Outfit
const outfit_delete = async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.outfitId);
        if (!outfit) {
            return res.json({ message: 'Outfit not found' }).status(404);
        } else if (outfit && outfit.orderId === null) {
            outfit.deleteOne();
            res.json('Outfit successfully deleted!').status(202);
        } else if (outfit && outfit.orderId !== null) {
            const order = await Order.findById(outfit.orderId);
            order.updateOne({ $pull: { outfitId: outfit._id }}).exec();
            if (order.outfitId.length <= 1) {
                order.deleteOne();
                outfit.deleteOne();
                const user = await User.findById(order.userId)
                user.$set({ orderId: null }).save();
                res.json('Outfit and Order successfully deleted!').status(202);
            } else {
                outfit.deleteOne();
                res.json('Outfit successfully deleted!').status(202); 
            };
        };
    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

module.exports = {
    outfit_get_all,
    outfit_get_id,
    outfit_post,
    outfit_patch,
    outfit_delete
}