import jwt from 'jsonwebtoken';

import tokenStore from '../tokenStore';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      error: 'No token provided.',
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    if (!decodedToken) {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      tokenStore.remove(token);
    }
    return res.status(401).json({
      error: 'Unauthorized access.',
    });
  }
  req.token = token;
  req.payload = decodedToken;
  return next();
};
