var express = require('express');
var session = require('express-session');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 3000;
//var bodyParser = require('body-parser');

app.use(methodOverride('_method'));

app.use(session({
  secret:"asdfasdf",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));
//app.use(bodyParser.json());

var runController = require('./controllers/runs.js');
app.use('/runs', runController);

var userController = require('./controllers/users.js');
app.use('/users', userController);

var sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

app.get('/', function(req, res){
  res.render('indexArray.ejs', {
    currentUser: req.session.currentUser
  });
});

/*app.use('/1st',function(req, res, next){
  console.log('1st middleware called');
  next();
});

app.use('/2nd',function(req, res, next){
  console.log('2nd middleware called');
  next();
});

app.use('/3rd',function(req, res, next){
  console.log('3rd middleware called');
  next();
});

//var fakeArray = require('./modules/fakeArray.js');
app.get('/', function (req, res) {
  //res.send('Hello World once more!');
  res.render('index.ejs', {
    dataArray:fakeArray
  });
});

app.get('/foo', function(req, res){res.send('path foo');});
app.get('/foo/bar', function(req, res){res.send('path foobar');});
*/

app.listen(PORT, function () {
  console.log('Training app listening on port 3000!');
});

//console.log(fakeArray);
