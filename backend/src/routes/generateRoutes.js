import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import { generationLimiter } from '../middleware/rateLimitMiddleware.js';
import { generateContent } from '../services/geminiService.js';
import validateRequest from '../utils/validateRequest.js';

const router = express.Router();

// POST /api/generate/text
router.post('/text', protect, generationLimiter, asyncHandler(async (req, res) => {
  validateRequest(req, res, ['prompt']);
  const { prompt } = req.body;
  const generatedText = await generateContent(prompt);
  res.json({ generatedText });
}));

export default router;
