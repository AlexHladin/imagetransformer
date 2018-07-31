const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: String,
  images: [ { type: mongoose.Schema.ObjectId, ref: 'Image' } ]
});

module.exports = mongoose.model('User', UserSchema);
