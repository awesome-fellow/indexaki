'use strict'

var restify = require('restify');
var assert = require('assert');
var client = null;
var FirebaseServer = require("firebase-server");
var Firebase = null;

before(function() {
  var port = process.env.PORT || 8080;
  // init the test client
  client = restify.createJsonClient({
    url: 'http://localhost:' + port,
    version: '*'
  });

  Firebase = new FirebaseServer(5000,
    "localhost.firebaseio.test", {
    });
});

after(function() {
  Firebase.close(console.log('\n —server closed — '));
});

describe('service: post get in firebase', function() {

  it('should add a name', function(done) {
    client
      .post('/add/kostas',
      function(err, req, res, data) {
        if (err) {
          throw new Error(err);
        }
        else {
          var body = JSON.parse(res.body);
          assert.equal(res.statusCode, 200);
          assert.equal(body.username, "kostas");
          done();
        }
      });
  });

  it('should get a name', function(done) {
    client
      .post('/add/kapekost',
      function() {
        client
          .get('/get/kapekost',
          function(err, req, res, data) {
            if (err) {
              throw new Error(err);
            }
            else {
              var body = JSON.parse(res.body);
              assert.equal(res.statusCode, 200);
              assert.equal(body.username, "kapekost");
              done();
            }
          });
      })
  })
})