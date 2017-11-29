const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');
const webhook = require('./routes/webhook');
const test = require('./routes/test');

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
app.set('view engine', 'jade');

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
