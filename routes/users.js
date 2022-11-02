const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Get All Users
router.get('/', usersController.user_get_all);

// Get User By ID
router.get('/:userId', usersController.user_get_id);

// Create New User
router.post('/', usersController.user_post);

// Update User Information
router.patch('/:userId', usersController.user_patch);

// Delete User
router.delete('/:userId', usersController.user_delete);

module.exports = router;