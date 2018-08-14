var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();
    var bookController = require('../Controllers/bookControllers')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId').get(function (req, res) {
            res.json(req.book);
        }).put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.delet);
    return bookRouter;
};
module.exports = routes;