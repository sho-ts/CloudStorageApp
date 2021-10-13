const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);
const Query = require(`${root}/src/query`);

class Model extends Query {
  /**
   * @var {string} table
   */
  static table = '';

  all = () => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${(this.constructor).table};`;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  }

  create = () => {
    return new Promise((resolve, reject) => {
      const { columns, values } = this.getColumnsAndValuesQuery();

      const sql = `
        insert into ${this.constructor.table} (${columns}) values (${values});
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

  update = () => {
    return new Promise((resolve, reject) => {
      const { columns, values } = this.getColumnsAndValuesQuery();

      const sql = `
        update ${this.constructor.table} set ${columns} = ${values}
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

export default Model;