var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/libraryApp');
var Book = require('./Models/bookmodel');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);


app.get('/', function (req, res) {
    res.send('welcome to mysda');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});