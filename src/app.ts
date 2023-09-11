import express, { Application, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session'; // Import cookie-session

const app: Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    name: 'session',
    keys: ['cat-secret-key'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

import indexRoute from './routes/index';
import authRoute from './routes/auth';

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
