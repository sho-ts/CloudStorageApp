const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);
const Model = require(`${root}/src/model`);

class Post extends Model {
  static table = 'posts';

  constructor(params) {
    super();
    if (params) {
      /** @var {number} id */
      this.id = params.id;

      /** @var {string} content */
      this.content = params.content;

      /** @var {number} uid */
      this.uid = params.uid;
    }
  }
}

module.exports = Post;