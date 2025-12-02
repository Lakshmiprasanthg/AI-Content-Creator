import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import { generationLimiter } from '../middleware/rateLimitMiddleware.js';
import { generateContent } from '../services/geminiService.js';
import validateRequest from '../utils/validateRequest.js';

const router = express.Router();

// POST /api/generate/text
router.post('/text', protect, generationLimiter, asyncHandler(async (req, res) => {
  try {
    console.log('[Generate] Request received from user:', req.user?._id);
    validateRequest(req, res, ['prompt']);
    const { prompt } = req.body;
    console.log('[Generate] Prompt length:', prompt?.length, 'Model: gemini-1.5-flash');
    
    const generatedText = await generateContent(prompt);
    console.log('[Generate] Success! Generated text length:', generatedText?.length);
    
    res.json({ generatedText });
  } catch (error) {
    console.error('[Generate] ERROR:', error.message);
    console.error('[Generate] Stack:', error.stack);
    throw error; // Let asyncHandler handle it
  }
}));

export default router;
