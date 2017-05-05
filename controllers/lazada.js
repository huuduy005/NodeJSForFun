/**
 * Created by huudu on 14/04/2017.
 */
const express = require('express');
const request = require('request');

var router = express.Router();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const async = require('async');
const Products = require('../models/product');

router.get('/', function (req, res) {
    Products.find({}, function (err, products) {
        if (err) throw err;
        res.json(products);
    });
});

var link_test = 'http://www.lazada.vn/samsung-galaxy-j7-2016-16gb-vang-hang-phan-phoi-chinh-thuc-2161341.html';

var get_a_product = function (link, callback) {
    var t = new Date();
    var time = t.getHours() + ':' + t.getMinutes();
    console.log(time + ' - ' + link);
    request({
        url: link
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        var name = $('#prod_title').text().trim();
        var pictures = '';
        var avatar = '';
        var short_description = '';
        var information_detail = '';

        //Lấy danh sách hình
        $('#productImageBox li > div > div').each(function (index) {
            var p_link = $(this).attr('data-big');
            if (index === 0)
                avatar = p_link;
            pictures += p_link + '\n';
        });
        //Lấy thông tin miêu tả ngắn gọn
        $('#prod_content_wrapper .prod_content li').each(function (index) {
            var sd_text = $(this).text();
            short_description += sd_text + '\n';
        });
        var price = $('#prod_content_wrapper #product-price-box #price_box').text().replace(/\./g, "");
        price = price.replace(/ VND,/g, '');
        //Lấy thông tin đầy đủ
        $('#productDetails + div .specification-table tr').each(function (index) {
            var item = $(this).children();
            var text = item.eq(0).text().trim() + '\t' + item.eq(1).text().trim();
            information_detail += text + '\n';
        });

        var manufacture = $('#prod_brand div').first().find('span').text().trim();
        var warranty = $('#prod_content_wrapper .prod-warranty .prod-warranty__term').text();
        var description = $('#productDetails').text().trim();
        var category = $('header .header__breadcrumb .breadcrumb__list li:nth-child(2) a').attr('title');

        var product = new Products({
            id: 2,
            name: name,
            manufacture: manufacture,
            short_description: short_description,
            price: price,
            information_detail: information_detail,
            description: description,
            category: category,
            warranty: warranty,
            pictures: pictures,
            avatar: avatar
        });
        product.save(function (err) {
            if (err) throw err;
            console.log(product);
            callback(null, link + 'done');
        });
    });
}

var list = [];
var base_url = 'http://www.lazada.vn';
var l = 'http://www.lazada.vn/may-vi-tinh-laptop/?itemperpage=120';
function get_data_link(link) {
    request({
        url: link
    }, function (err, res, body) {
        var $ = cheerio.load(body);
        $('.layout__container .catalog__main__wrapper .c-product-list .c-product-list__item').each(function (index) {
            var link = base_url + $(this).find('.c-product-card__img-placeholder a').attr('href');
            list.push(link);
        });

        async.mapLimit(list, 5, get_a_product, function (err, results) {
            console.log('end');
        });
    });
}

get_data_link(l);
// get_a_product(link_test);

module.exports = router;