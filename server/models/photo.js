'use strict';

const mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  url: String,
  caption: String
});

module.exports = exports = mongoose.model('Photo', photoSchema);
