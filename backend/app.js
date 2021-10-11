const root = require('app-root-path');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require(`${root}/app/routes`);

app.use(cors());
app.use(router);

app.listen(3000, () => {
  console.log('Start');
});