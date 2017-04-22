'use strict'

var restify = require('restify');
var assert = require('assert');
var client = null;
// require("../indexaki.js");

before(function(){
  var port = process.env.PORT || 8080;
  // init the test client
    client = restify.createJsonClient({
    url: 'http://localhost:'+port,
    version: '*'
  });
});

describe('service: post endpoint', function() {
it('should list echo the name', function(done) {
  client
    .get('/echo/kostas', 
    function(err, req, res, data){
      if (err) {
        throw new Error(err);
      }
      else {
        var body = JSON.parse(res.body);
        assert.equal(res.statusCode, 200);
        assert.equal(body.name, "kostas");
        done();
      }
    });
  });
});