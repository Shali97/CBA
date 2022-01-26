var http = require('http');

var express = require('express');
var app = express();

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(books);
});

app.listen(8081);