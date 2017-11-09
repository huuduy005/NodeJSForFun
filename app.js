var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var webhook = require('./routes/webhook');

/*Kết nối database*/
// load mongoose package
// var mongoose = require('mongoose');
// // Use native Node promises
// mongoose.Promise = global.Promise;
// var db = mongoose.connect('mongodb://localhost/HD');
// db
//     .then(function () {
//         console.log('Kết nối thành công đến');
//     })
//     .catch(function (err) {
//         console.error(err);
//     });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var stream = require('stream');
var Minio = require('minio'),
    multiparty = require('multiparty');

var minioClient = new Minio.Client({
    endPoint: '192.168.5.18',
    port: 9000,
    secure: false,
    accessKey: 'YMIEZOP0VZW02ZROBN7F',
    secretKey: 'lEZ5fkyCCQTtkFJJNKxX2rqcByy8NjfM3E4wSfNe'
});
// app.use(function () {
//     if (req.headers['content-type'].search("multipart/form-data")) {
//         return null;
//     } else {
//         return bodyParser.json({limit: '50mb'});
//     }
// });
app.post('/uploadhd', function (req, res, next) {
    var Readable = stream.Readable;

    var rs = new Readable();
    // rs.push('beep ');
    // rs.push('boop\n');
    // rs.push(null);

    var form = new multiparty.Form();

    form.on('part', function (part) {
        if (part.filename) {
            console.log('Helo');
            minioClient.putObject('vexere', part.filename, part, function (err, etags) {
                if (err)
                    res.send('fail');
                else
                    res.send('Done');
            })
        }
    });

    form.on('error', function (error) {
        console.log(error);
    });

    form.parse(req);

});

/*-------------------------------*/
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var Minio = require('./libs/minio');

app.post('/uploadmulter', upload.any(), function (req, res, next) {
    console.log(req);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

/**/
var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/somewhere/filename.jpg', function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});
/**/

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

var diskE = 'E:\\minio';
app.use('/hd', express.static(path.join(diskE, 'data')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/webhook', webhook);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
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

var test = require('./for_test');

module.exports = app;
