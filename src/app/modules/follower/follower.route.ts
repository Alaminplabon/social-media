import { Router } from 'express';
import { followerController } from './follower.controller';

const router = Router();

router.post('/create-follower', followerController.createfollower);

router.patch('/update/:id', followerController.updatefollower);

router.delete('/:id', followerController.deletefollower);

router.get('/:id', followerController.getfollower);
router.get('/', followerController.getfollower);

export const followerRoutes = router;