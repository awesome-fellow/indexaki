'use strict'

const restify = require('restify');
const Storage = require('./libs/storage');

const storage = new Storage();

const server = restify.createServer({
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
  .post('/documents/:title', function(req, res, next) {
    var doc_body = (req.headers['content-type'] === "application/json") ? req.params.body : JSON.parse(req.body).body;
    storage.addItem({ title: req.params.title, body: doc_body })
      .then((document) => {
        res.send({ document_uuid: document.document_uuid });
        return next();
      });
  });

server
  .get('/documents/:title', function(req, res, next) {
    storage.getItem(req.params.title)
      .then((document) => {
        res.send({ "title": document.title, "body": document.body });
        return next();
      });
  });

server
  .get('/documents', function(req, res, next) {
    storage.getItems()
      .then((documents) => {
        res.send(documents);
        return next();
      });
  });

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
