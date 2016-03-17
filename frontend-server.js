// module.exports = exports = function(port) {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 5000;

  app.use('/', express.static(__dirname + '/build'));

  return app.listen(port, () => {
    console.log('Client server up on party port: ' + port);
    // PORT 5000
  });
// };
