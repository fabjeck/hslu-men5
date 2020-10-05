import express from 'express';
import { user as userSanitization } from '../../middleware/sanitize';
import checkAuth from '../../middleware/checkAuth';
import * as userController from '../controllers/user';

const router = express.Router();

router.post('/', userSanitization.signup, userController.signup);

router.post('/signin', userSanitization.signin, userController.signin);

router.patch('/', checkAuth, userSanitization.update, userController.update);

router.delete('/', checkAuth, userController.del);

export default router;
