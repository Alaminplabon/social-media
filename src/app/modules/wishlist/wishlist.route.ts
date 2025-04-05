import { Router } from 'express';
import { wishlistController } from './wishlist.controller';
import parseData from '../../middleware/parseData';
import fileUpload from '../../middleware/fileUpload';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import multer, { memoryStorage } from 'multer';
// const upload = fileUpload('./public/uploads/profile');
const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });
router.post(
  '/create-wishlist',
  auth(USER_ROLE.user),
  upload.fields([
    { name: 'images', maxCount: 500 },
    { name: 'videos', maxCount: 500 },
  ]),
  parseData(),
  wishlistController.createWishlist,
);

// router.patch('/update/:id', wishlistController.updatewishlist);

// router.delete('/:id', wishlistController.deletewishlist);

// router.get('/:id', wishlistController.getwishlist);
// router.get('/', wishlistController.getwishlist);

export const wishlistRoutes = router;
