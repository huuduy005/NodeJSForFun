const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');

const Router = require('./routes/index');
require('./mongoose')();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// middleware
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })
);
app.use(cookieParser());
// public asset
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
