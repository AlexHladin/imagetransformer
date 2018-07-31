const fs = require('fs');
const path = require('path');

const prefix = '/api';

module.exports = app => {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => app.use(`${prefix}/${file.slice(0, file.indexOf('.'))}`, require(path.join(__dirname, file))));
};
