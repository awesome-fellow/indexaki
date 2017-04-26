'use strict'
var uuid = require('uuid/v4');

var generate_uuid = function() {
	return uuid();
}
module.exports = {
	generate_uuid: generate_uuid
}