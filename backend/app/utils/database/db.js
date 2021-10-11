const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'express',
  charset: 'utf8mb4'
});