var connect = require('connect');
var express = require('express');
var app = express();


var serveStatic = require('serve-static');
connect().use(serveStatic("/app/index.html")).listen(8080, function(){
    console.log('Server running on 8080...');
});

app.get('/', function(req, res, next) {
    res.send("Hello world");
});