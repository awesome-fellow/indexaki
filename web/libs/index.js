'use strict'
require("./main.css")
require("../../node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css")
global.jQuery = global.$ = require('../../node_modules/jquery/dist/jquery.min.js')
require("bootstrap-material-design")
$.material.init()

const API_URL = '@@API_URL'

document.getElementById('save_document').addEventListener('click', function() {
	let doc_title = document.getElementById('doc_title').value
	let doc_body = document.getElementById('doc_body').value
	console.log(doc_title)
	console.log(doc_body)
	$.post(API_URL + "/document/" + doc_title,
		{
			body: doc_body,
		},
		function(data, status) {
			console.log("Data: " + data + "\nStatus: " + status);
		})
})