var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Bitpower 代码开放共享平台');
});

var server = app.listen(80, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});