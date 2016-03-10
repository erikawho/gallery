const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/gallery_app_dev');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

const photoRouter = require(__dirname + '/../routes/photo_routes');

app.use('/api', photoRouter);
app.use(express.static(__dirname + '/build'));

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Backend server up on party port: ' + PORT));
