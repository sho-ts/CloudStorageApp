const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);
const Post = require(`${root}/app/model/Post`);

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

    try {
      const result = await Post.create(content);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static read = async (req, res) => {
    try {
      const result = await Post.find(req.params.id);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static update = async (req, res) => {
    const { id } = req.query;
    const { content } = req.body;

    try {
      const result = await Post.update(id, content);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static delete = async (req, res) => {
    const { id } = req.query;

    try {
      const result = await Post.delete(id);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = PostController;