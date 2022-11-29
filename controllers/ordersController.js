const Product = require('../models/Product');
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
        const products = await Product.find({ _id: req.body.productId })
        if (!products || products.length === 0) {
            return res.json({ message: 'Product not found' }).status(404);
        };

        const users = await User.find({ _id: req.body.userId });
        if (!users || users.length === 0) {
            return res.json({ message: 'User not found' }).status(404);
        };

        const item = [];
        const customer = [];
        const order = new Order({
            productId: item,
            userId: customer
        });

        for (let i = 0; i < products.length; i++) {
            item.push(products[i]._id);
        };

        for (let i = 0; i < users.length; i++) {
            customer.push(users[i]._id);
        };

        order.$set({
            productId: item,
            userId: customer
        }).save();

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

        const products = await Product.find({ _id: req.body.productId });
        if (!products || products.length === 0) {
            return res.json({ message: 'Product not found' }).status(404);
        };

        const users = await User.find({ _id: req.body.userId });
        if (!users || users.length === 0) {
            return res.json({ message: 'User not found' }).status(404);
        };

        const item = [];
        const customer = [];
        const updateOrder = order.$set({
            productId: item,
            userId: customer
        });

        for (let i = 0; i < products.length; i++) {
            item.push(products[i]._id);
        };

        for (let i = 0; i < users.length; i++) {
            customer.push(users[i]._id);
        };

        updateOrder.$set({
            productId: item,
            userId: customer
        }).save();

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