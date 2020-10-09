import { body } from 'express-validator';

const users = {
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
    body('password')
      .escape(),
  ],
};

const posts = [
  body('title')
    .not().isEmpty()
    .trim()
    .escape()
]

export { users, posts };
