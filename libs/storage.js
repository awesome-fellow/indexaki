'use strict'
const firebase = require('firebase');
const Document = require('./models/document');

const config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000",
    storageBucket: process.env.FB_BUCKET
};
firebase.initializeApp(config);

const Storage = function() {
    this.db = firebase.database();
};

Storage.prototype.addItem = function(data) {
    let document = new Document(data);
    return new Promise((resolve, reject) => {
        this.db.ref('/documents')
            .set(document);
        resolve(document);
    });
}

Storage.prototype.getItem = function(username) {
    return new Promise((resolve, reject) => {
        this.db.ref('/documents')
            .once('value')
            .then((snapshot) => {
                resolve(snapshot.val());
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = Storage;