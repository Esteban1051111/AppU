import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug';
import path, { dirname } from 'path';
import sql from './config/database.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';


//import nodemon from './src/nodemon.js';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const debugApp = debug('app');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(dirname('.'), '/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/validar', (req, res) => {
  res.render('validar');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/rcontrasena', (req, res) => {
  res.render('rcontrasena');
});

app.listen(5000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});

