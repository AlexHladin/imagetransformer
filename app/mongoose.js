const mongoose = require('mongoose');

const config = require('../config');

module.exports = () => {
  const db = mongoose.connect(
    `mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.database}`,
    error => {
      if (error) {
        console.log(`Mongoose default connection error: ${error}`);
      } else {
        console.log('Mongo connected');
      }
    }
  );

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${config.db.host}`);
  });

  mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  return db;
};
