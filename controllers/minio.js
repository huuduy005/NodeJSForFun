/**
 * Created by huudu on 5/16/2017.
 */
var express = require('express');
var router = express.Router();
var Minio = require('../libs/minio');
var multer = require('multer');

var file = './icon-vxr.png';

router.post('/', function (req, res, next) {
    res.json({
        code: 200
    })
});

router.get('/', function (req, res, next) {
    res.send('Chưa xong.');
});

var bucketName = 'europetrip';
var name = 'photos-europe.png';
router.post('/createFolder', function (req, res, next) {
    var _name = req.body.name;
    if (_name.length < 3) {
        res.json({
            error: 'Short name',
            status: 'FAIL'
        })
    } else
        Minio.createFolder(_name, function (err) {
            if (err)
                res.json({
                    error: err,
                    status: 'FAIL'
                })
            else
                res.json({
                    error: null,
                    status: 'OK'
                })
        });
});
router.post('/base64', function (req, res, next) {
    var image_encode = req.body.data;
    var params = {
        pathName: req.body.path,
        fileName: req.body.name,
        override: req.body.override === "true"
    };
    console.log('override ' + params.override);
    Minio.saveBase64(params, image_encode, function (err, mess, path) {
        if (err) {
            res.status(405).json({
                err: err,
                path: null,
                mess: 'FAIL'
            });
        } else {
            res.json({
                err: null,
                path: path,
                mess: mess
            });
        }
    });
});

router.get('/get', function (req, res, next) {
    Minio.checkIsExited(function (err, stat) {
        res.json({
            error: err,
            stat: stat
        });
    })
});

var Minio = require('minio'),
    multiparty = require('multiparty');

var minioClient = new Minio.Client({
    endPoint: '192.168.5.18',
    port: 9000,
    secure: false,
    accessKey: 'GUP5Y25XG2PXGJV3SMDA',
    secretKey: '3FCn8APhcANflj0PaCk4P9ujwQHl9YbMga58T2W5'
});
function getstream(req, res, next) {
    var form = new multiparty.Form();

    form.on('part', function (part) {
        if (part.filename) {
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
}

router.post('/post', getstream, function (req, res, next) {
    console.log('sdsdsd');
    res.send('ddd');
});

module.exports = router;