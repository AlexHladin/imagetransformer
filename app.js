const express = require('express');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');

const middleware = require('./app/middleware');
const swagger = require('./app/swagger');
const routes = require('./app/routes');
const mongo = require('./app/mongoose');
const config = require('./config');

const app = express();

middleware(app, routes, swagger);
mongo();

const configPath = path.join(__dirname, config.uploadDir);
if (!fs.existsSync(configPath)) {
  fs.mkdirSync(configPath);
}

module.exports = app;
