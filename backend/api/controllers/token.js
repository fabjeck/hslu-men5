import tokenStore from '../../tokenStore';

import tokenFactory from '../utils/token';

export default function silentTokenRefresh(req, res) {
  if (tokenStore.contains(req.token)) {
    tokenStore.remove(req.token);
    const token = tokenFactory(req.paylaod, res);
    return res.status(200).json({
      message: 'Tokens refreshed',
      token,
      tokenExpiry: process.env.JWT_EXPIRY,
    });
  }
  return res.status(404).json({
    error: 'Unknown token.',
  });
}
