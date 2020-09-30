import express from 'express';
import { user as userSanitization } from '../middleware/sanitize';
import * as userController from '../controllers/user';

const router = express.Router();

router.post('/', userSanitization.signup, userController.signup);

router.post('/signin', userSanitization.signin, userController.signin);

router.patch('/:userID', userSanitization.update, userController.update);

router.delete('/:userID', userSanitization.delete, userController.del);

export default router;
