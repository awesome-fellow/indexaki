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

  it('should get first of 2 documents', function(done) {
    client
      .post('/document/kapekost', { body: "test body" },
      function() {
        client
          .post('/document/kapekost2', { body: "test body2" },
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

  it('should get all documents', function(done) {
    client
      .post('/document/kapekost', { body: "test body" },
      function() {
        client
          .post('/document/kapekost2', { body: "test body2" },
          function() {
            client
              .get('/documents',
              function(err, req, res, data) {
                if (err) {
                  throw new Error(err);
                }
                else {
                  let body = JSON.parse(res.body);
                  assert.equal(res.statusCode, 200);
                  expect(body).to.exist;
                  done();
                }
              });
          })
      })
  })
})

describe('Document', function() {
  var Document = require('../libs/models/document')

  it('should create a document', function() {
    var doc = new Document({
      document_uuid: 'uuid',
      title: "doc title",
      body: "doc body"
    })
    assert.notEqual(doc.document_uuid, 'uuid')
    assert.equal(doc.title, 'doc title')
    assert.equal(doc.body, 'doc body')
  })

  it('should not be able to manually set the document uuid', function() {
    var doc = new Document({
      document_uuid: 'uuid'
    })
    assert.notEqual(doc.document_uuid, 'uuid')
  })

  it('should modify the document\'s title', function() {
    var doc = new Document({
      title: 'old title'
    })
    assert.equal(doc.title, 'old title')
    doc.setTitle('new title');
    assert.equal(doc.title, 'new title')
  })

  it('should modify the document\'s body', function() {
    var doc = new Document({
      body: 'old body'
    })
    assert.equal(doc.body, 'old body')
    doc.setBody('new body');
    assert.equal(doc.body, 'new body')
  })

})