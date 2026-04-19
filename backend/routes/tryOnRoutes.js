const express = require('express');
const router = express.Router();
const tryOnController = require('../controllers/tryOnController');
const upload = require('../middleware/upload');

// POST /api/tryon - Process try-on with user and product images
router.post('/', upload.single('userImage'), tryOnController.processTryOn);

module.exports = router;