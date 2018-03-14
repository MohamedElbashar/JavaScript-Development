var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var url = 'mongodb://localhost:27017/libraryApp';

var router = function () {
    authRouter.route('/signUp').post(function (req, res) {
        console.log(req.body);
        mongodb.connect(url, function (err, client) {
            var db = client.db('libraryApp');
            var collection = db.collection('users');
            var user = {
                username: req.body.userName,
                password: req.body.password
            };
            collection.insert(user, function (err, results) {
                req.login(results.ops[0], function () {
                    res.redirect('/auth/profile');
                });
            });
        });
    });
    authRouter.route('/signIn').post(passport.authenticate('local', {
        failueRedirect: '/'
    }), function (req, res) {
        res.redirect('/auth/profile');
    });
    authRouter.route('/profile').all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });
    return authRouter;
};
module.exports = router;