/** @format */

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const payementRoutes = require('./routes/paymentRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// very imp!!
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
    routes: ['/api/v1/user', '/api/v1/items', '/api/v1/admin'],
  });
});

app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This is base route of API',
  });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/admin', adminRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
