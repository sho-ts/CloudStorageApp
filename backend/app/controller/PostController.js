const root = require('app-root-path');
const db = require(`${root}/app/utils/database/db`);

module.exports = {
  posts: (req, res) => {
    const sql = 'select * from posts;';
    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(result);
    });
  },

  post: (req, res) => {
    const sql = `  
    select * from posts
      where id = ${req.query.id};
    `;

    db.query(sql, (err, result, fields) => {

      if (err) throw err;

      res.json(result.length > 0 ? result[0] : {});
    });
  },
}