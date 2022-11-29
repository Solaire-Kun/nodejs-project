const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Get All Products
router.get('/', productsController.product_get_all);

// Get Product By ID
router.get('/:productId', productsController.product_get_id);

// Create New Product
router.post('/', productsController.product_post);

// Update Product Information
router.patch('/:productId', productsController.product_patch);

// Delete Product
router.delete('/:productId', productsController.product_delete);

module.exports = router;