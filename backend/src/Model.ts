import db from '@/app/utils/database/db';
import Query from '@/src/Query';

class Model extends Query {
  static table = '';
  public id = 0;

  all = () => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${(this.constructor as typeof Model).table};`;

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
        insert into ${(this.constructor as typeof Model).table} (${columns}) values (${values});
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
        select * from ${(this.constructor as typeof Model).table}
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
        update ${(this.constructor as typeof Model).table} set ${columns} = ${values}
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
        update ${(this.constructor as typeof Model).table} set del_flg = 1
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