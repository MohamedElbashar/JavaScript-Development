var bookController = function (Book) {
    var post = function (req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('title is required');  
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };
    var get = function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    }
    var put = function (req, res) {
        req.title = req.body.title;
        req.author = req.body.author;
        req.genre = req.body.genre;
        req.read = req.body.read;
        req.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    };
    var patch = function (req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var p in req.body) {
            req.book[p] = req.body[p];
        }
        req.book.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    };
    var delet = function (req, res) {
        req.book.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    };
    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        delet: delet
    };
};
module.exports = bookController;