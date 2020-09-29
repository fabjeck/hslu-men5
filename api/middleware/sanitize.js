import { body, param } from 'express-validator';

const user = {
  signup: [
    body('username')
      .not().isEmpty()
      .trim()
      .escape(),
    body('mail')
      .isEmail()
      .normalizeEmail(),
    body('password')
      .not().isEmpty()
      .trim()
      .escape(),
  ],
  signin: [
    body('username')
      .not().isEmpty()
      .trim()
      .escape(),
    body('password')
      .not().isEmpty()
      .trim()
      .escape(),
  ],
  update: [
    body('mail')
      .isEmail()
      .normalizeEmail(),
    body('image')
      .escape(),
    param('userID')
      .escape(),
  ],
  delete: [
    param('userID')
      .escape(),
  ],
};

// eslint-disable-next-line import/prefer-default-export
export { user };
