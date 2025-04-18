import express from 'express';
import { getUserHistory } from '../controllers/history.controller.js';
import protect from '../middlewares/auth.middleware.js'

const router = express.Router();

// Protected route to fetch user's response history
router.get('/history', protect, getUserHistory);

export default router;
