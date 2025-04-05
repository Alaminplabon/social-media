import { Router } from 'express';
import { postController } from './post.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import parseData from '../../middleware/parseData';
import multer, { memoryStorage } from 'multer';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });
router.post(
  '/create-post',
  auth(USER_ROLE.user),
  upload.fields([{ name: 'images', maxCount: 500 }]),
  parseData(),
  postController.createpost,
);

router.patch('/update/:id', postController.updatepost);

router.delete('/:id', postController.deletepost);

router.get('/:id', postController.getpostById);
router.get('/', postController.getAllpost);

export const postRoutes = router;
