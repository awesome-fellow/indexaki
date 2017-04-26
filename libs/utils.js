'use strict'
const uuid = require('uuid/v4');

const generate_uuid = function() {
	return uuid();
}
module.exports = {
	generate_uuid: generate_uuid
}