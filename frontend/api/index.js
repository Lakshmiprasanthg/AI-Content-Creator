import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../../backend/src/config/db.js';
import authRoutes from '../../backend/src/routes/authRoutes.js';
import generateRoutes from '../../backend/src/routes/generateRoutes.js';
import contentRoutes from '../../backend/src/routes/contentRoutes.js';
import { apiLimiter } from '../../backend/src/middleware/rateLimitMiddleware.js';
import errorHandler from '../../backend/src/middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow all Vercel preview and production URLs
    if (origin.includes('vercel.app')) return callback(null, true);
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/content', contentRoutes);

app.use(errorHandler);

let isConnected = false;

export default async function handler(req, res) {
  try {
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Check environment variables
    if (!process.env.MONGO_URI) {
      console.error('Missing MONGO_URI environment variable');
      return res.status(500).json({ error: 'Server configuration error: Missing MONGO_URI' });
    }

    // Connect to MongoDB
    if (!isConnected) {
      console.log('Connecting to MongoDB...');
      await connectDB();
      isConnected = true;
      console.log('MongoDB connected successfully');
    }

    // Pass request to Express app
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}