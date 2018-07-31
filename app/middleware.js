const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');

const { passport } = require('./auth');
const errors = require('./errors/errors');
const ApiError = require('./errors/ApiError');

const apiErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.responseCode).json(err.response);
  }

  next(err);
};

const lastErrorMiddleware = (err, req, res, next) => {
  res
    .status(errors.INTERNAL_SERVER_ERROR.responseCode)
    .send({
      code: errors.INTERNAL_SERVER_ERROR.code,
      error: errors.INTERNAL_SERVER_ERROR.error,
      message: errors.INTERNAL_SERVER_ERROR.message
    });
};

const notFoundMiddleware = (err, req, res, next) => {
  const error = new ApiError(errors.NOT_FOUND);
  res
    .status(error.responseCode)
    .json(error.response);
};

module.exports = (app, routes, swagger) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app);
  swagger(app);

  // errors
  app.use(apiErrorMiddleware);
  app.use(lastErrorMiddleware);
  app.use(notFoundMiddleware);
};
