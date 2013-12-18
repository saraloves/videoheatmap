var express = require('express');
var app = express.createServer();

console.log('serving static files from: ', __dirname);


app.use('/', express.static('public/', __dirname));

app.use(express.bodyParser());

app.listen(3000);
console.log('Listening on port 3000');