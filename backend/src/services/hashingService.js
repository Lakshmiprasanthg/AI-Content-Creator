import bcrypt from 'bcryptjs';

const saltRounds = 10; // Standard salt rounds for security

/**
 * Hashes a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password from the database.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 */
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
