const root = require('app-root-path');
const express = require('express')
const router = express.Router();

const PostController = require(`${root}/app/controller/PostController`);

router.get('/posts', PostController.posts);
router.get('/post', PostController.post)

module.exports = router;