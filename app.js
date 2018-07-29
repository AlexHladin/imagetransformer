const express = require('express');
const createError = require('http-errors');

const middleware = require('./app/middleware');
const swagger = require('./app/swagger');
const routes = require('./app/routes');
const mongo = require('./app/mongoose');

const app = express();

middleware(app, routes);
swagger(app);
mongo();

module.exports = app;
