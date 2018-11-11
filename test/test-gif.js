'use strict'

const restify = require('restify-clients');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

let client = null;

before(function() {
  const port = process.env.PORT || 8080;
  // init the test client
  client = restify.createJsonClient({
    url: 'http://localhost:' + port,
    version: '*'
  });
});

describe('service: post get gif', function() {

  it('should get a gif url', function(done) {
    client
      .get('/images/dog',
        function(err, req, res, data) {
          if (err) {
            throw new Error(err);
          }
          else {
            let body = JSON.parse(res.body);
            assert.equal(res.statusCode, 200);
            // expect(body.).to.exist;
            done();
          }
        });
  });
})