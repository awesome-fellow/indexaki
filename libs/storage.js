'use strict'
var firebase = require('firebase');

var config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000",
    storageBucket: process.env.FB_BUCKET
};
firebase.initializeApp(config);

var Storage = function() {

};

Storage.prototype.addItem = function(username) {
    firebase
        .database()
        .ref('/' + username)
        .set({
            "username": username
        });
}

Storage.prototype.getItem = function(username) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('/' + username)
            .once('value')
            .then(function(snapshot) {
                resolve(snapshot.val().username);
            });
    });
}

module.exports = Storage;