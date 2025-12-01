import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { signToken } from '../services/jwtService.js';
import validateRequest from '../utils/validateRequest.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  validateRequest(req, res, ['username', 'email', 'password']);
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('Email already registered');
  }
  const user = await User.create({ username, email, password });
  const token = signToken(user._id);
  res.status(201).json({
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  validateRequest(req, res, ['email', 'password']);
  const { email, password } = req.body;
  // Need password selected explicitly
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const token = signToken(user._id);
  res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
}));

export default router;
