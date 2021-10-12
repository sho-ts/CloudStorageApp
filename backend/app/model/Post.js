const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);
const AbstractModel = require(`${root}/app/model/AbstractModel`);

class Post extends AbstractModel {
  static table = 'posts';

  /**
   * @param {number} id 
   */
  constructor(id) {
    super(id);
  }
}

module.exports = Post;