import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import ContentItem from '../models/ContentItem.js';
import validateRequest from '../utils/validateRequest.js';

const router = express.Router();

// POST /api/content/save
router.post('/save', protect, asyncHandler(async (req, res) => {
  validateRequest(req, res, ['promptUsed', 'generatedText']);
  const { promptUsed, generatedText, category } = req.body;
  const item = await ContentItem.create({
    userId: req.user._id,
    promptUsed,
    generatedText,
    category: category || 'Other'
  });
  res.status(201).json({ item });
}));

// GET /api/content/history
router.get('/history', protect, asyncHandler(async (req, res) => {
  const items = await ContentItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ items });
}));

export default router;
