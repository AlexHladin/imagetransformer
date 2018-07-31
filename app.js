const express = require('express');

const middleware = require('./app/middleware');
const swagger = require('./app/swagger');
const routes = require('./app/routes');
const mongo = require('./app/mongoose');

const app = express();

middleware(app, routes, swagger);
mongo();

module.exports = app;
