'use strict'
require("./main.css")
require("../../node_modules/material-design-lite/dist/material.purple-green.min.css")
require("../../node_modules/material-design-lite/dist/material.min.css")
require("material-design-lite")

const API_URL = '@@API_URL'

var callAPI = function(method, url, data) {
	return new Promise((resolve, reject) => {
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				resolve(xmlHttp.responseText)
			}
		}
		xmlHttp.open(method, url, true)
		xmlHttp.send(JSON.stringify(data));
	});
}

document.getElementById('save_document').addEventListener('click', function() {
	var doc_title = document.getElementById("doc_title").value
	var doc_body = document.getElementById("doc_body").value
	var data = { "body": doc_body };
	callAPI("POST", API_URL + "/documents/" + doc_title, data)
		.then(function() { fetch_all_docs() });
})

document.getElementById('fetch_all_button').addEventListener('click', function() {
	fetch_all_docs();
})

document.getElementById('clear_docs').addEventListener('click', function() {
	clear_docs();
})
function fetch_all_docs() {
	callAPI("GET", API_URL + "/documents").then(
		function(documents) {
			cleanup_list();
			documents = JSON.parse(documents)
			documents.forEach(doc => {
				ui_add_document(doc.title, doc.body);
			})
		}
	);
}

function clear_docs() {
	callAPI("DELETE", API_URL + "/documents").then(
		function(documents) {
			cleanup_list();
			documents = [];
		}
	);
}

function cleanup_list() {
	//cleanup previews display
	var myNode = document.getElementById("doc_list");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
}
function fetch_gif(title) {
	return callAPI("GET", API_URL + "/images/" + title).then(gif => Promise.resolve(gif.replace(/\"/g, "")))
}

function ui_add_document(title, body) {
	fetch_gif(title).then(gif => {
		var doc_list = document.getElementById('doc_list');
		var bullet_div = document.createElement("div");
		bullet_div.className = "section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone";
		var inner_bullet_div = document.createElement("img");
		inner_bullet_div.setAttribute("src", gif);
		inner_bullet_div.setAttribute("height", "80em");
		bullet_div.appendChild(inner_bullet_div);

		var main_div = document.createElement("div");
		main_div.className = "section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone"
		var main_h5 = document.createElement("h5");
		main_h5.innerText = title;
		main_h5.appendChild(bullet_div);
		main_div.appendChild(main_h5);
		var main_p = document.createElement("p");
		main_p.textContent = body
		main_div.appendChild(main_p);
		doc_list.appendChild(main_div);
	});
}