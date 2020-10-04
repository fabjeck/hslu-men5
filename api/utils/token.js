import jwt from 'jsonwebtoken';

import tokenStore from '../tokenStore';

function generateToken({ userID, username, image }) {
  return jwt.sign(
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
}

function generateRefreshToken({ userID, username, image }) {
  return jwt.sign(
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
}

function tokenFactory(payload, res) {
  const refreshToken = generateRefreshToken(payload);
  const token = generateToken(payload);
  tokenStore.add(refreshToken);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Set-Cookie', `token=${refreshToken}; Secure; HttpOnly`);
  return token;
}

export default tokenFactory;
