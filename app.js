var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;

app.set("views", __dirname + "/client/src/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/client"));

app.get('/', (req, res) => {
    res.render('index.html');
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
})
module.exports = app;
