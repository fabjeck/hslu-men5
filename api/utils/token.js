import jwt from 'jsonwebtoken';

const generateToken = ({ userID, username, image }) => jwt.sign(
  {
    userID,
    username,
    image,
  },
  process.env.JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRY,
  },
);

const generateRefreshToken = ({ userID, username, image }) => jwt.sign(
  {
    userID,
    username,
    image,
  },
  process.env.JWT_REFRESH_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  },
);

export { generateRefreshToken, generateToken };
