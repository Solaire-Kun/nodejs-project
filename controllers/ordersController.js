const Outfit = require('../models/Outfit');
const User = require('../models/User');
const Order = require('../models/Order');

// Get All Orders
const order_get_all = async (req, res) => {
    try {
        const ordersList = await Order.find().sort({ creationDate: -1 });
        res.json(ordersList).status(200);
    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Get Order By ID
const order_get_id = async (req, res) => {
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
};

// Create New Order
const order_post = async (req, res) => {
    try {
        const outfits = await Outfit.find({ _id: req.body.outfitId })
        if (!outfits || outfits.length === 0) {
            return res.json({ message: 'Outfit not found' }).status(404);
        };

        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.json({ message: 'User not found' }).status(404);
        };

        const item = [];
        const order = new Order({
            outfitId: item,
            userId: req.body.userId
        });

        for (let i = 0; i < outfits.length; i++) {
            outfits[i].$set({ orderId: order._id }).save()
            item.push(outfits[i]._id)
        };

        user.$set({ orderId: order._id }).save();
        order.$set({ outfitId: item }).save();
        res.json(order).status(201);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Update Order Information
const order_patch = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        if (!order) {
            return res.json({ message: 'Order not found' }).status(404);
        };

        const clearOutfit = await Outfit.find({ _id: order.outfitId });
        clearOutfit.forEach((outfit) => {outfit.$set({ orderId: null }).save()});

        const outfits = await Outfit.find({ _id: req.body.outfitId });
        if (!outfits || outfits.length === 0) {
            return res.json({ message: 'Outfit not found' }).status(404);
        };

        const item = [];
        const updateOrder = order.$set({
            outfitId: item
        });

        for (let i = 0; i < outfits.length; i++) {
            outfits[i].$set({ orderId: order._id }).save()
            item.push(outfits[i]._id)
        };

        updateOrder.$set({ outfitId: item }).save();
        res.json(updateOrder).status(200);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Delete Order
const order_delete = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.json({ message: 'Order not found' }).status(404);
        };

        const outfits = await Outfit.find({ _id: order.outfitId });
        outfits.forEach((outfit) => outfit.$set({ orderId: null }).save());

        const user = await User.findById(order.userId);
        user.$set({ orderId: null }).save();

        order.deleteOne();
        return res.json('Order successfully deleted!').status(202);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

module.exports = {
    order_get_all,
    order_get_id,
    order_post,
    order_patch,
    order_delete
}