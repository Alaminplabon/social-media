import { Router } from 'express';
import { commentsController } from './comments.controller';

const router = Router();

router.post('/create-comments', commentsController.createcomments);

router.patch('/update/:id', commentsController.updatecomments);

router.delete('/:id', commentsController.deletecomments);

router.get('/:id', commentsController.getcomments);
router.get('/', commentsController.getcomments);

export const commentsRoutes = router;