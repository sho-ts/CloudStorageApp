const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);

module.exports = {
  index: (req, res) => {
    const sql = 'select * from posts;';

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(result);
    });
  },

  create: (req, res) => {
    const { content } = req.body;

    const sql = `
      insert into posts (content) values ('${content}');
    `;

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(true);
    });
  },

  read: (req, res) => {
    const sql = `  
      select * from posts
      where id = ${req.params.id};
    `;

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(result.length > 0 ? result[0] : {});
    });
  },

  update: (req, res) => {
    const { id } = req.query;
    const { content } = req.body;

    const sql = `
      update posts set content = '${content}'
      where id = ${id};
    `;

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(true);
    });
  },

  delete: (req, res) => {

  }
}