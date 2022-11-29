const Product = require('../models/Product');

// Get All Product
const product_get_all = async (req, res) => {
    try {
        const productsList = await Product.find();
        res.json(productsList).status(200);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Get Product By ID
const product_get_id = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product == null) {
            res.json('Product not found').status(404);
        } else {
            res.json(product).status(201);
        };

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Create New Product
const product_post = async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        size: req.body.size,
        pictures: req.body.pictures,
        brand: req.body.brand
    });
    try {
        const createProduct = await product.save();
        res.json(createProduct).status(201);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Update Product Information
const product_patch = async (req, res) => {
    try {
        const updateProduct = await Product.updateOne({ _id: req.params.productId }, {
            $set: {
                productName: req.body.productName,
                size: req.body.size,
                pictures: req.body.pictures,
                brand: req.body.brand
            }
        });
        res.json({ message: 'Product not found' }).status(200);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Delete Product
const product_delete = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.json({ message: 'Product not found' }).status(404);

        } else {
            product.deleteOne();
            res.json('Product successfully deleted!').status(202);
        };

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

module.exports = {
    product_get_all,
    product_get_id,
    product_post,
    product_patch,
    product_delete
}