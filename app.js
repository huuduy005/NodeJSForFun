const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const config = require('./config');

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');
const webhook = require('./routes/webhook');
const test = require('./routes/test');
const firebase = require('./routes/firebase');

/*Kết nối database*/
// load mongoose package
const mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
let db = mongoose.connect(config.database);
db.then(function () {
    console.log('Kết nối thành công đến' + config.database);
}).catch(function (err) {
    console.error(err);
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/webhook', webhook);
app.use('/test', test);
app.use('/firebase', firebase);

// app.get('/logs', function (req, res, next) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(fs.readFileSync(__dirname + '/sse-node.html'));
//     res.end();
// })
// app.get('/sse', function (req, res, next) {
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'
//     })
//     res.write("data: " + "HD" + "\n\n");
//     setInterval(() => {
//         res.write("id: " + "HD" + "\n\n");
//         res.write("data: " + "HD" + "\n\n");
//     }, 500)
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
