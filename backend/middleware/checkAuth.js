import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({
      error: 'No authorization header provided.',
    });
  }
  const token = authHeader.replace('Bearer ', '');
  if (!token || token === '') {
    return res.status(401).json({
      error: 'No token provided.',
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      error: 'Unauthorized access.',
    });
  }
  req.userID = decodedToken.userID;
  next();
};
