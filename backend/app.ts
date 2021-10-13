import root from 'app-root-path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '@/app/routes'
const app: express.Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log('Start');
});