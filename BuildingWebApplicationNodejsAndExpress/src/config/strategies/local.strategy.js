var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
        function (username, password, done) {
            mongodb.connect(url, function (err, client) {
                console.log(err);
                var db = client.db('libraryApp');
                var collection = db.collection('users');
                console.log(collection);
                collection.findOne({
                    username: username,
                }, function (err, results) {
                    console.log(err);
                    if (results) {
                        if (results.password === password) {
                            var user = results;
                            console.log(user);
                            done(null, user);
                        } else {
                            done('Bad Password', null);
                        }
                    }
                    else {
                        done('Bad request', null);
                    }

                });
            });
        }));
};