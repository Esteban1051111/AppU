import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug'; // Asegúrate de importar debug
import path, { dirname } from 'path';
import usuariosRouter from './src/routers/usuariosRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { localStrategy } from './config/strategies/localStrategy.js';
 

// Crear la aplicación Express
const debugApp = debug('app');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar express-session antes de passport
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false
}));

// Inicializar passport después de express-session
app.use(passport.initialize());
app.use(passport.session());

// Inicializar la estrategia local
localStrategy();

// Otros middlewares...
app.use(express.static(path.join(dirname('.'), '/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rutas
app.use('/usuarios', usuariosRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Rutas de ejemplo
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

app.get('/administrador', (req, res) => {
  res.render('vista_administrador');
});

app.get('/profesor', (req, res) => {
  res.render('vista_profesor');
});

app.get('/estudiante', (req, res) => {
  res.render('vista_estudiante');
});

app.get('/escanerQR', (req, res) => {
  res.render('escaner');
});


// Iniciar el servidor
app.listen(5000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});