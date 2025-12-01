import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const generationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: {
    message: 'Generation limit exceeded. Please wait an hour or contact support.',
    code: 'GENERATION_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});
