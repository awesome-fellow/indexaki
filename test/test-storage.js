'use strict'

const restify = require('restify');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

let client = null;
const FirebaseServer = require("firebase-server");
let Firebase = null;

before(function() {
  const port = process.env.PORT || 8080;
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
  Firebase.close(console.log('\n —server closed— '));
});

describe('service: post get in firebase', function() {

  it('should add a document', function(done) {
    client
      .post('/document/kostas',
      function(err, req, res, data) {
        if (err) {
          throw new Error(err);
        }
        else {
          let body = JSON.parse(res.body);
          assert.equal(res.statusCode, 200);
          expect(body.document_uuid).to.exist;
          done();
        }
      });
  });

  it('should get a document', function(done) {
    client
      .post('/document/kapekost', { body: "test body" },
      function() {
        client
          .get('/document/kapekost',
          function(err, req, res, data) {
            if (err) {
              throw new Error(err);
            }
            else {
              let body = JSON.parse(res.body);
              assert.equal(res.statusCode, 200);
              assert.equal(body.title, "kapekost");
              assert.equal(body.body, "test body");
              done();
            }
          });
      })
  })
})