import { generateRefreshToken, generateToken } from '../utils/token';

class TokenStore {
  constructor() {
    this.list = new Set();
  }

  add(refreshToken) {
    this.list.add(refreshToken);
  }

  refresh(req, res) {
    if (this.list.has(req.token)) {
      this.list.delete(req.token);
      const refreshToken = generateRefreshToken(req.decodedToken);
      const token = generateToken(req.decodedToken);
      this.list.add(refreshToken);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Set-Cookie', `token=${refreshToken}; Secure; HttpOnly`);
      return res.status(200).json({
        message: 'Tokens refreshed',
        token,
        tokenExpiry: process.env.JWT_EXPIRY,
      });
    }
    return res.status(401).json({
      error: 'Unknown token.',
    });
  }
}

const singletonInstance = new TokenStore();
Object.freeze(singletonInstance);

export default singletonInstance;
