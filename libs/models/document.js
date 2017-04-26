'use strict'

var utils = require('./../utils');

var Document = function(document) {
	this.document_uuid = utils.generate_uuid();
	this.title = document.title || "";
	this.body = document.body || "";
}
Document.prototype.setTitle = function(title) {
	this.title = title;
}
Document.prototype.setBody = function(body) {
	this.body = body;
}
module.exports = Document;