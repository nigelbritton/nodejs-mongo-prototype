/**
 *
 */

const MongoClient = require('mongodb').MongoClient;

const Utilities = require('./core-utilities');

const Database = {
    uri: '',
    db: null,
    client: null,

    connect: function(uri, db, coll) {
        return new Promise(function(resolve, reject) {
            if (Database.db) {
                // Connection already established
                resolve();
            } else {
                MongoClient.connect(Database.uri, { useNewUrlParser: true }, function (err, client) {
                    if (err) {
                        console.log("Error connecting: " + err.message);
                        reject(err);
                    } else {
                        Database.client = client;
                        if (db) {
                            Database.db = Database.client.db(db);
                            if (coll) {
                                const collection = Database.db.collection(coll);
                            }
                        }
                        resolve();
                    }
                });
            }
        });
    },

    selectDatabase: function(db) {
        if (Database.client) {
            Database.db = Database.client.db(db);
        }
    },

    selectCollection: function(coll) {
        if (Database.db) {
            Database.db.collection(coll);
        }
    },

    close: function() {
        if (Database.client) { Database.client.close(); }
    },

    countDocuments: function(coll) {
        return new Promise(function (resolve, reject) {
            if (Database.db === null) {
                reject('No valid connection');
            } else {
                Database.db.collection(coll, { strict: true }, function(error, collection) {
                    if (error) {
                        console.log("Could not access collection: " + error.message);
                        reject(error.message);
                    } else {
                        collection.count()
                            .then(
                                function(count) {
                                    resolve(count);
                                },
                                function(err) {
                                    console.log("countDocuments failed: " + err.message);
                                    reject(err.message);
                                }
                            )
                    }
                });
            }
        });
    },

    addDocument: function (coll, document) {
        return new Promise(function (resolve, reject) {
            Database.db.collection(coll, { strict: false }, function(error, collection) {
                if (error) {
                    console.log("Could not access collection: " + error.message);
                    reject(error.message);
                } else {
                    collection.insertOne(document, {w: "majority"})
                        .then(function(result) {
                            console.log('Document added: ' + new Date().getTime());
                            resolve(result);
                        }, function(err) {
                            console.log("Insert failed: " + err.message);
                            reject(err.message);
                        });
                }
            })
        });
    }

};




module.exports = {
    connect: Database.connect,
    selectDatabase: Database.selectDatabase,
    selectCollection: Database.selectCollection,
    close: Database.close,
    countDocuments: Database.countDocuments,
    addDocument: Database.addDocument,
};