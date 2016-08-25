var express = require('express');
var controller = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users.js');

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
  res.render('new.ejs');
});

controller.post('/', function(req, res){
  User.create(req.body).then(function(createdUser){
    //createdRun is the object representation of the row created in the DB
    res.redirect('/');
  });
});

module.exports = controller;
