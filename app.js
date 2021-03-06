import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import contactsRouter from './routes/contacts.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv'

dotenv.config()
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
    Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii'))
  )
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

export default app;
