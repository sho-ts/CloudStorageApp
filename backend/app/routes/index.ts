import express from 'express';
import PostController from '@/app/controller/PostController';
const router = express.Router();

router.get('/posts', PostController.index);
router.post('/post/create', PostController.create);
router.get('/post/:id([0-9]+)', PostController.read);
router.post('/post/update', PostController.update);
router.get('/post/delete', PostController.delete);

export default router;