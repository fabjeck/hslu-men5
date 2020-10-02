import jwt from 'jsonwebtoken';

const generateToken = ({ userID, username }) => jwt.sign(
  {
    userID,
    username,
  },
  process.env.JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRY,
  },
);

const generateRefreshToken = ({ userID, username }) => jwt.sign(
  {
    userID,
    username,
  },
  process.env.JWT_REFRESH_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  },
);

export { generateRefreshToken, generateToken };
