import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'express',
  charset: 'utf8mb4'
});

export default db;