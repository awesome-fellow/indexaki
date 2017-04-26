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
  .post('/document/:title', function(req, res, next) {
    storage.addItem({ title: req.params.title })
      .then((document) => {
        res.send({ document_uuid: document.document_uuid });
        return next();
      });
  });

server
  .get('/document/:title', function(req, res, next) {
    storage.getItem(req.params.title)
      .then((document) => {
        res.send({ "title": document.title });
        return next();
      });
  });

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
