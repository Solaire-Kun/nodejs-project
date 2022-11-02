const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Get All Orders
router.get('/', ordersController.order_get_all)

// Get Order By ID
router.get('/:orderId', ordersController.order_get_id);

// Create New Order
router.post('/', ordersController.order_post);

// Update Order Information
router.patch('/:orderId', ordersController.order_patch);

// Delete Order
router.delete('/:orderId', ordersController.order_delete);

module.exports = router;