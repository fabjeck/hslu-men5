import jwt from 'jsonwebtoken';

import tokenStore from '../../tokenStore';

function generateToken({ userID, username }) {
  const payload = {
    userID,
    username,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
}

function generateRefreshToken({ userID, username }) {
  const payload = {
    userID,
    username,
  };
  const secretKey = process.env.JWT_REFRESH_SECRET;
  const options = {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
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
