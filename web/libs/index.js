'use strict'
require("./main.css")
require("../../node_modules/material-design-lite/dist/material.purple-green.min.css")
require("../../node_modules/material-design-lite/dist/material.min.css")
require("material-design-lite")

const API_URL = '@@API_URL'

document.getElementById('save_document').addEventListener('click', function() {
	var doc_title = document.getElementById("doc_title").value
	var doc_body = document.getElementById("doc_body").value
	var data = {
		body: doc_body,
	}
	callAPI("POST", API_URL + "/document/" + doc_title)
})

var callAPI = function(method, url, data) {
	return new Promise((resolve, reject) => {
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				resolve(xmlHttp.responseText)
			}
		}
		xmlHttp.open(method, url, true)
		xmlHttp.send(data);
	});
}