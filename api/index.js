import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../backend/src/config/db.js';
import authRoutes from '../backend/src/routes/authRoutes.js';
import generateRoutes from '../backend/src/routes/generateRoutes.js';
import contentRoutes from '../backend/src/routes/contentRoutes.js';
import { apiLimiter } from '../backend/src/middleware/rateLimitMiddleware.js';
import errorHandler from '../backend/src/middleware/errorHandler.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL || 'https://ai-content-creator-zeta.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
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
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
}