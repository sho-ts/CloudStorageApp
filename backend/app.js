const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({
    id: 1,
    message: 'hello world'
  })
});

app.listen(3000, () => {
  console.log('Start');
});