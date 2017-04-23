'use strict'

var restify = require('restify');
var firebase = require('firebase');

var server = restify.createServer({
  name: 'indexaki',
  version: '1.0.0'
});

var config = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000",
  storageBucket: process.env.FB_BUCKET
};
firebase.initializeApp(config);
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get(/\/web\/?.*/, restify.serveStatic({
  directory: __dirname
}));
server
  .post('/add/:username', function(req, res, next) {
    res
      .send(req.params);
    firebase
      .database()
      .ref('/' + req.params.username)
      .set({
        "username": req.params.username
      });
    return next();
  });

server
  .get('/get/:username', function(req, res, next) {
    firebase
      .database()
      .ref('/' + req.params.username)
      .once('value')
      .then(function(snapshot) {
        var username = snapshot.val().username;
        res.send({ "username": username });
      });
  });

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
