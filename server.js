var express = require('express');
var fakeArray = require('./modules/fakeArray.js');
var app = express();
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
  //res.send('Hello World once more!');
  res.render('index.ejs', {
    dataArray:fakeArray
  });
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});

console.log(fakeArray);
