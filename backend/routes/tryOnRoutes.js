import express from 'express';
import tryOnController from '../controllers/tryOnController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST /api/tryon - Process try-on with user and product images
router.post('/', upload.single('userImage'), tryOnController.processTryOn);

export default router;