'use strict'
var firebase = require('firebase');

var Document = require('./models/document');

var config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000",
    storageBucket: process.env.FB_BUCKET
};
firebase.initializeApp(config);

var Storage = function() {

};

Storage.prototype.addItem = function(document) {
    var document = new Document(document);
    firebase
        .database()
        .ref('/documents')
        .set(document);
}

Storage.prototype.getItem = function(username) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('/documents')
            .once('value')
            .then(function(snapshot) {
                resolve(snapshot.val());
            });
    });
}

module.exports = Storage;