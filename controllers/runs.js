var express = require('express');
var controller = express.Router();
var Runs = require('../models/runArray.js');

controller.get('/', function(req, res){
  Runs.findAll().then(function(totalRuns){
    //createdRun is the object representation of the row created in the DB
    res.json(totalRuns);
  });
});

controller.get('/new',function(req, res){
  res.send('show new page');
});

controller.get('/:id', function(req, res){
  //res.send('Parameter id has value: ' + req.params.id);
  res.json(runs[req.params.id]);
});

controller.post('/', function(req, res){
  //console.log(req.query);
  //res.send('show index page');
  //runs.push(req.body);
  //res.send(runs);
  //res.send('post works');
  /*{
    date: new Date('2016-1-1'),
    distance: 5.5
  }*/
  Runs.create(req.body).then(function(createdRun){
    //createdRun is the object representation of the row created in the DB
    res.json(createdRun);
  });
});

controller.put('/:id', function(req, res){
  runs[req.params.id] = req.body;
  res.json(runs);
});

controller.delete('/:id', function(req, res){
  runs.splice(req.params.id, 1);
  res.json(runs);
});

module.exports = controller;
