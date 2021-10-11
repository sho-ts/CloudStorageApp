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

  show: (req, res) => {
    const sql = `  
    select * from posts
      where id = ${req.params.id};
    `;

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(result.length > 0 ? result[0] : {});
    });
  },

  create: (req, res) => {

  },

  update: (req, res) => {

  },

  delete: (req, res) => {

  }
}