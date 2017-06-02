/**
 * Created by huudu on 5/16/2017.
 */
var path = require("path");
var Minio = require('minio');
var Q = require('q');

var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    secure: false,
    accessKey: 'GUP5Y25XG2PXGJV3SMDA',
    secretKey: '3FCn8APhcANflj0PaCk4P9ujwQHl9YbMga58T2W5'
});

var region = 'us-east-1';
var bucketNameDefault = 'vexere';

function saveBase64(params, data, callback) {
    var decodedImage = new Buffer(data, 'base64');
    /*Xử lý đường dẫn truyền vào*/
    var time = new Date();
    var name = params.fileName;
    var _pathName = path.join(params.pathName, name);

    var _list = _pathName.split('\\');
    /*remove phần tử đầu trống*/
    while (_list[0] === '') {
        _list.shift();
    }
    var pathName;
    var bucketName;
    if (_list.length > 1) {
        bucketName = _list.shift();
        pathName = _list.join('/');
    } else {
        bucketName = bucketNameDefault;
        pathName = name;
    }

    var deferred = Q.defer();
    var override = params.override;
    if (override === false) {
        check(bucketName, pathName, function (err, stat) {
            if (err) deferred.resolve();
            else {
                if (stat) {
                    deferred.reject();
                } else
                    deferred.resolve();
            }
        });
    } else {
        deferred.resolve();
    }

    deferred.promise.then(function () {
        minioClient.putObject(bucketName, pathName, decodedImage, function (e) {
            if (e) {
                if (e.code && e.code === 'NoSuchBucket') { //Bucket không tồn tại
                    minioClient.makeBucket(bucketName, region, function (err) {
                        if (err) {
                            callback(e, null, null);
                        } else {
                            params.test = 'Helu';
                            saveBase64(params, data, callback);
                        }
                    });
                } else {
                    console.log(e);
                    callback(e, null, null);
                    return;
                }

            } else {
                console.log("Successfully uploaded the Buffer");
                callback(null, 'OK', path.posix.join(bucketName, pathName));
            }
        })
    }).catch(function () {
        callback('File đã tồn tại', null, null)
    });
}

function saveStream(params, stream, callback) {

}

module.exports = {
    saveBase64: saveBase64,
    saveStream: saveStream
};

function check(bucketName, name, callback) {
    // var bucketName = 'vexere';
    // var name = 'wwww/1494993385075lion_14-wallpaper-1920x1080.jpg';
    minioClient.statObject(bucketName, name, function (err, stat) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, stat);
        }
    });
};
var expires_in = 2 * 60;//đơn vị second
function getLink(bucketName, name, callback) {
    minioClient.presignedGetObject(bucketName, name, expires_in, function (err, presignedUrl) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        console.log(presignedUrl);
        callback(null, presignedUrl);
    });
}