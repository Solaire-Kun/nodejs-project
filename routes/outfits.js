const express = require('express');
const router = express.Router();
const outfitsController = require('../controllers/outfitsController');

// Get All Outfits
router.get('/', outfitsController.outfit_get_all);

// Get Outfit By ID
router.get('/:outfitId', outfitsController.outfit_get_id);

// Create New Outfit
router.post('/', outfitsController.outfit_post);

// Update Outfit Information
router.patch('/:outfitId', outfitsController.outfit_patch);

// Delete Outfit
router.delete('/:outfitId', outfitsController.outfit_delete);

module.exports = router;