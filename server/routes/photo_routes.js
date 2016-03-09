'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const Photo = require(__dirname + '/../models/photo');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var photoRouter = module.exports = exports = express.Router();

photoRouter.get('/photo', (req, res) => {
  Photo.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

photoRouter.post('/photo', bodyParser, (req, res) => {
  var newPhoto = new Photo(req.body);
  newPhoto.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
