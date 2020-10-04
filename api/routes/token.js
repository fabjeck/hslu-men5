import express from 'express';

import checkRefreshToken from '../middleware/checkRefreshToken';
import tokenStore from '../controllers/token';

const router = express.Router();

router.post('/', checkRefreshToken, tokenStore.refresh);

export default router;
