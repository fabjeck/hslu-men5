import express from 'express';
import { posts as postSanitization } from '../../middleware/sanitize';
import checkAuth from '../../middleware/checkAuth';
import imageUpload from '../../middleware/imageUpload';
import imageResize from '../../middleware/imageResize';
import * as postsController from '../controllers/posts';

const imageSizes = [
  {
    width: 300,
    height: null
  },
  {
    width: 500,
    height: null
  },
  {
    width: 800,
    height: null
  }
];

const router = express.Router();

router.post('/', checkAuth, imageUpload, imageResize(imageSizes, 'posts'), postSanitization, postsController.create);

router.get('/', postsController.get);

router.get('/:image', postsController.getSingle);

router.patch('/likes/:postID', checkAuth, postsController.toggleLike);

export default router;