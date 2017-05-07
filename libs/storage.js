'use strict'
const firebase = require('firebase')
const Document = require('./models/document')

const config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000",
    storageBucket: process.env.FB_BUCKET
};
firebase.initializeApp(config)

const Storage = function() {
    this.documents = []
    this.db = firebase.database()
    this.db.ref('/documents')
        .on('child_added', (snapshot) => {
            this.documents.push(snapshot.val())
        })
};

Storage.prototype.addItem = function(data) {
    let document = new Document(data)
    return new Promise((resolve, reject) => {
        this.db.ref('/documents/' + document.document_uuid)
            .set(document)
        resolve(document)
    });
}

Storage.prototype.getItem = function(title) {
    var self = this
    return new Promise((resolve, reject) => {
        self.documents.forEach((doc) => {
            if (doc.title === title) {
                resolve(doc)
            }
        })
    })
}

Storage.prototype.getItems = function() {
    var self = this
    return new Promise((resolve, reject) => {
        resolve(self.documents);
    })
}
module.exports = Storage;