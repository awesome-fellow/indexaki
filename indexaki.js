'use strict'

var restify = require('restify');
var Storage = require('./libs/storage');

var storage = new Storage();

var server = restify.createServer({
  name: 'indexaki',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server
  .get(/\/public\/?.*/, restify.serveStatic({
    'directory': __dirname,
    'default': 'index.html'
  }));

server
  .post('/document/:username', function(req, res, next) {
    res
      .send(req.params);
    storage.addItem(req.params.username);
    return next();
  });

server
  .get('/document/:username', function(req, res, next) {
    storage.getItem(req.params.username).then(function(item) {
      res.send({ "username": item });
    });
  });

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
