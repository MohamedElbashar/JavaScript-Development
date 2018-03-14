var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017';
var bookController = function (bookServices, nav) {
    var middleWar = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    var getIndex = function (req, res) {
        mongodb.connect(url, function (err, client) {
            var db = client.db('libraryApp');
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });

    };
    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        mongodb.connect(url, function (err, client) {
            var db = client.db('libraryApp');
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {
                bookServices.getBookById(results.bookId, function (err, book) {
                    results.book = book;
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
            });
        });
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleWar: middleWar
    }
}
module.exports = bookController;