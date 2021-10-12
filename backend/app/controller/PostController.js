const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);
const Post = require(`${root}/app/model/Post`);

console.log(Post.create)

class PostController {
  static index = async (req, res) => {
    try {
      const result = await Post.all();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static create = async (req, res) => {
    const { content } = req.body;
    const post = new Post();
    post.set({
      content
    });

    try {
      const result = await post.create();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static read = async (req, res) => {
    const post = new Post(req.params.id)

    try {
      const result = await post.get();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static update = async (req, res) => {
    const { id } = req.query;
    const { content } = req.body;
    const post = new Post(id);

    try {
      const result = await post.update(content);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static delete = async (req, res) => {
    const { id } = req.query;
    const post = new Post(id);

    try {
      const result = await post.delete();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = PostController;