var express = require('express');
var controller = express.Router();
var bodyParser = require('body-parser');
Users = require('../models/users.js');

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
  res.render('sessions/new.ejs');
});

controller.post('/', function(req, res){
  //res.send(req.body);
  Users.find({
    where:{
      name: req.body.name
    }
  }).then(function(foundUser){
    if(foundUser.password == req.body.password){
      req.session.currentUser = foundUser;
      res.redirect('/');
    }
    else{
      res.redirect('/sessions/new');
    }
    //res.send(foundUser);
  });
});

controller.delete('/',function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});

module.exports = controller;
