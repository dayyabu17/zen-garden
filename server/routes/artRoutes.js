import express from 'express';
import { getArt, saveArt } from '../controllers/artController.js';

const router = express.Router();

// GET /api/art - Fetch all artworks
router.get('/', getArt);

// POST /api/art - Save new artwork
router.post('/', saveArt);

export default router;
