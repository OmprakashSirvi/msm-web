/** @format */

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
   console.log(err.name, err.message, `\nError : ${err}`);
   process.exit(1);
});

const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
);

mongoose
   .connect(DB, {})
   .then(() => {
      console.log('db connection success!!!');
   })
   .catch((err) => {
      if (err) {
         console.log('There was some error!!!🥵');
         console.log(err.message);
      }
   });

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const server = app.listen(port, () => {
   console.log(`App is up and running at : http://${host}:${port}`);
});

process.on('unhandledRejection', (err) => {
   console.log(err.name, err.message);
   console.log('UNHANDLED REJECTION😫');
   server.close(() => {
      process.exit(1);
   });
});
