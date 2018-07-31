const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  width: {
    type: Number,
    min: 1,
    max: 100000
  },
  height: {
    type: Number,
    min: 1,
    max: 100000
  }
});

module.exports = mongoose.model('Image', ImageSchema);
