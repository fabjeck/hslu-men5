import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({
      error: 'No token provided.',
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).json({
      error: 'Unauthorized access.',
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      error: 'Unauthorized access.',
    });
  }
  req.token = token;
  req.decodedToken = decodedToken;
  return next();
};
