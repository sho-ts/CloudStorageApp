import express from 'express';
import { PostController } from '@/app/controller';
const router = express.Router();

router.get('/posts', PostController.index);
router.post('/post', PostController.create);
router.get('/post/:id([0-9]+)', PostController.read);
router.put('/post', PostController.update);
router.delete('/post', PostController.delete);

export default router;