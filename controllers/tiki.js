/**
 * Created by huudu on 20/12/2016.
 */
var express = require('express');
var request = require('request');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;


router.post('/', function (req, res) {
    var link = req.body.link;
    console.log(link);
    getData(link);
    res.send('OK');
});

router.get('/', function (req, res) {
    console.log(datalink);
    res.send(datalink.toString());
});

function writeFile(path, contents, cb) {
    mkdirp(getDirName(path), function (err) {
        if (err) return cb(err);
        fs.writeFile(path, contents, 'binary', cb);
    });
}

var data_link = [];
function getData(link) {
    var folder = link.match(/https:\/\/tiki.vn\/(.*)\//)[1];
    request({
        url: link,
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        $('.product-item   ').each(function(){
            var node_image = '';
            var num = $(this).find('.image > img');

            var url_item = $(this).children().eq(0).attr('href');
            if (num.length === 2){
                node_image = $(this).find('.image > img')[1];
            }else
                node_image = $(this).find('.image > img')[0];

            var name_item = $(this).attr('data-title');
            var link_thumb = $(node_image).attr('src');

            var item = {
                folder: folder,
                name: name_item,
                thumb: link_thumb,
                link_item: url_item
            };
            data_link.push(item);
        });
        console.log(data_link);

        // async.map(data_link, getImageItem);
        async.each(data_link, function (item) {
            console.log(item);
            getImageItem(item);
        });
    });
}

function getImageItem(item) {
    //Lấy image thumb
    request(item.thumb, {encoding: 'binary'}, function(error, response, body) {
        writeFile(namef + '/' + name, body,  function (err) {
            if (err)
                console.log('loi');
            else
                console.log('done');
        });
    });
    //Lấy image large
    request({
        url: link_item,
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        var link_large = $('#product-magiczoom').attr('src');

    });
}

function getImage(link, folder, name) {
    // console.log(link);
    link = link.match(/(.*)\?ref=/)[1];
    // console.log(link);
    request({
        url: link
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        var link_image = $('#product-magiczoom').attr('src');
        console.log(link_image);
        var ll = encodeURI(link_image);
        fecthImage(link_image, folder + '/' + name + '_');
    });
}

module.exports = router;
