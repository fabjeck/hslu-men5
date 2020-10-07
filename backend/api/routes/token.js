import express from 'express';

import checkRefreshToken from '../../middleware/checkRefreshToken';
import silentTokenRefresh from '../controllers/token';

const router = express.Router();

router.get('/', checkRefreshToken, silentTokenRefresh);

export default router;
