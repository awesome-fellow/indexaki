'use strict'

const restify = require('restify');
const Storage = require('./libs/storage');
const gifSearch = require('gif-search');

const storage = new Storage();

const server = restify.createServer({
  name: 'indexaki',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server
  .get('/public/*', restify.plugins.serveStatic({
    'directory': __dirname,
    'default': 'index.html'
  }));

server
  .post('/documents/:title', function(req, res, next) {
    var doc_body = req.body.body;
    storage.addItem({ "title": req.params.title, "body": doc_body })
      .then((document) => {
        res.send({ document_uuid: document.document_uuid });
        return next();
      });
  });

server
  .get('/documents/:title', function(req, res, next) {
    storage.getItem(req.params.title)
      .then(document => {
        res.send({ "title": document.title, "body": document.body });
        return next();
      });
  });

server
  .get('/documents', function(req, res, next) {
    storage.getItems()
      .then(documents => {
        res.send(documents);
        return next();
      });
  });

server
  .del('/documents', function(req, res, next) {
    storage.removeItems()
      .then(a => {
        res.send({ status: 200 })
        return next()
      })
  });

server
  .get('/images/:q', function(req, res, next) {
    gifSearch.random(req.params.q).then(
      gifUrl => {
        res.send(gifUrl)
        return next();
      });
  })

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
