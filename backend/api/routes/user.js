import express from 'express';
import { user as userSanitization } from '../../middleware/sanitize';
import checkAuth from '../../middleware/checkAuth';
import * as userController from '../controllers/user';
import imageUpload from '../../middleware/imageUpload';
import imageResize from '../../middleware/imageResize';

const imageSizes = [
  {
    width: 100,
    height: null
  }
];

const router = express.Router();

router.post('/', userSanitization.signup, userController.signup);

router.post('/signin', userSanitization.signin, userController.signin);

// router.patch('/', checkAuth, imageUpload, imageResize(imageSizes, 'profil', Date.now()), userSanitization.update, userController.update);

router.post('/', imageUpload, userSanitization.update, userController.update);

router.delete('/', checkAuth, userController.del);

export default router;
