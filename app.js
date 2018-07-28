const express = require('express');
const createError = require('http-errors');

const middleware = require('./app/middleware');
const swagger = require('./app/swagger');
const routes = require('./app/routes');

const app = express();

middleware(app);
swagger(app);
routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: res.locals.message });
});

module.exports = app;
