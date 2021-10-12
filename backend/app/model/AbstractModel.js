const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);

class AbstractModel {
  static table = '';

  /**
   * @param {number} id 
   */
  constructor(id) {
    this.id = id;
  }

  set = (values) => {
    this.id = values.id;
    this.content = values.content;

    return this;
  }

  static all = () => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${this.table};`;

      console.log(this.constructor)

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
        select * from ${this.table}
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

  create = () => {
    return new Promise((resolve, reject) => {
      const sql = `
        insert into ${this.constructor.table} (content) values ('${this.content}');
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

  get = () => {
    return new Promise((resolve, reject) => {
      const sql = `  
        select * from ${this.constructor.table}
        where id = ${this.id};
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

  update = (content) => {
    return new Promise((resolve, reject) => {
      const sql = `
        update ${this.constructor.table} set content = '${content}'
        where id = ${this.id};
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

  delete = () => {
    return new Promise((resolve, reject) => {
      const sql = `
        update ${this.constructor.table} set del_flg = 1
        where id = ${this.id};
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

module.exports = AbstractModel;