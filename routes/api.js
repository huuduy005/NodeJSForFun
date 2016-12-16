/**
 * Created by HP on 15/12/2016.
 */
var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var facebook = require('../controllers/facebook');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'MyApi'});
});

router.use('/facebook', facebook);

/*Tăng lượt view cho Yum*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getTime() {
    var date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
function YumViews() {
    console.log(' + ' + getTime());
    var URL = 'http://startupnation.vn/yum-nguyen-thanh-an.htm#.WFJzXUImiFA.facebook';
    request({
        url: URL,
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        var num_view = $('.idea-info').children().eq(1).find('tr').eq(1).children().eq(1).text().trim();
        console.log(' + Số lượt view hiện tại: ' + num_view);
        var n = parseInt(num_view);
        if (n < 500) {
            var time = getRandomInt(2, 8);
            time = time * 10000;
            setTimeout(YumViews, time);
            console.log(' - Sẽ tăng lượt view sau ' + time + ' phút nữa.');
        } else {
            console.log('Số lượng view đã đạt ' + n);
        }

    });
}

console.log(getTime());
setTimeout(YumViews, 3000);

module.exports = router;
