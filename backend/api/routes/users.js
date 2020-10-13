import express from 'express';
import { users as userSanitization } from '../../middleware/sanitize';
import checkAuth from '../../middleware/checkAuth';
import * as usersController from '../controllers/users';
import imageUpload from '../../middleware/imageUpload';
import imageResize from '../../middleware/imageResize';

const imageSizes = [
  {
    width: 50,
    height: null
  },
  {
    width: 100,
    height: null
  }
];

const router = express.Router();

router.post('/', userSanitization.signup, usersController.signup);

router.post('/signin', userSanitization.signin, usersController.signin);

router.patch('/', checkAuth, imageUpload, imageResize(imageSizes, 'profiles'), userSanitization.update, usersController.update);

router.delete('/', checkAuth, usersController.del);

router.get('/:username', usersController.get);

export default router;
