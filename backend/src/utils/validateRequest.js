/**
 * Ensures required fields are present in the request body.
 * Throws an error (caught by error handler) if any field is missing.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {string[]} requiredFields
 * @returns {boolean}
 */
const validateRequest = (req, res, requiredFields) => {
  for (const field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === '') {
      res.status(400);
      throw new Error(`Missing required field: ${field}`);
    }
  }
  return true;
};

export default validateRequest;
