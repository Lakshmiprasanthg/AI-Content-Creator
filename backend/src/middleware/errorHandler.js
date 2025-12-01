/**
 * Custom error handler middleware for Express.
 * Catches all errors and formats a structured JSON response.
 * @param {Error} err The error object.
 * @param {import('express').Request} req The Express request object.
 * @param {import('express').Response} res The Express response object.
 * @param {import('express').NextFunction} next The Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    code: err.code || 'SERVER_ERROR'
  });
};

export default errorHandler;
