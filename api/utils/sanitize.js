import { validationResult } from 'express-validator';

// eslint-disable-next-line consistent-return
const evaluateSanitization = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

export default evaluateSanitization;
