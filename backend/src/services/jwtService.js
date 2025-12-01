import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set in environment variables. Token operations will fail.');
}

/**
 * Signs a JWT token for a given user ID.
 * @param {string} userId - The MongoDB ObjectId of the user.
 * @returns {string} The signed JWT.
 */
export const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT string from the request header.
 * @returns {object} The decoded token payload.
 * @throws {Error} If the token is invalid or expired.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
