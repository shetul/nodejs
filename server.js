var express = require('express');
var fakeArray = require('./modules/fakeArray.js');
var app = express();
app.get('/', function (req, res) {
  //res.send('Hello World once more!');
  res.render('index.ejs', {
    dataArray:fakeArray
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

console.log(fakeArray);
