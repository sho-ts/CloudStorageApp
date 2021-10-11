const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);

class Post {
  /**
   * @param {number} id 
   */
  constructor(id) {
    this.id = id;
  }

  static all = () => {
    return new Promise((resolve, reject) => {
      const sql = 'select * from posts;';

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  }

  static find = (id) => {
    return new Promise((resolve, reject) => {
      const sql = `  
        select * from posts
        where id = ${id};
      `;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0 ? result[0] : {})
        }
      });
    })
  }

  static create = (content) => {
    return new Promise((resolve, reject) => {
      const sql = `
        insert into posts (content) values ('${content}');
      `;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }

  static update = (id, content) => {
    return new Promise((resolve, reject) => {
      const sql = `
        update posts set content = '${content}'
        where id = ${id};
      `;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }

  static delete = (id) => {
    return new Promise((resolve, reject) => {
      const sql = `
        update posts set del_flg = 1
        where id = ${id};
      `;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }
}

module.exports = Post;