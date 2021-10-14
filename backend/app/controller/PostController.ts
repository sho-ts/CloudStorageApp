import express from 'express';
const root = require('app-root-path');
const Post = require(`${root}/app/model/Post`);

class PostController {
  static index = async (req: express.Request, res: express.Response) => {
    try {
      const post = new Post();
      const result = await post.all();

      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static create = async (req: express.Request, res: express.Response) => {
    try {
      const { content } = req.body;
      const post = new Post({
        content
      });

      const result = await post.create();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static read = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const post = new Post({
        id
      })
      const result = await post.get();

      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static update = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.query;
      const { content } = req.body;
      const post = new Post({ id, content });

      const result = await post.update();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }

  static delete = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.query;
      const post = new Post({ id });

      const result = await post.delete();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  }
}

export default PostController;