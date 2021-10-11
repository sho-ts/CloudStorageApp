const root = require('app-root-path');
const express = require('express')
const router = express.Router();

const PostController = require(`${root}/app/controller/PostController`);

router.get('/posts', PostController.index);
router.post('/post/create', PostController.create);
router.get('/post/:id([0-9]+)', PostController.read);
router.post('/post/update', PostController.update);
router.get('/post/delete', PostController.delete);

module.exports = router;