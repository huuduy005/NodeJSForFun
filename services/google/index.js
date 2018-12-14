const _ = require('lodash');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const util = require('util');
const vm = require('vm');
const request = require('request');
const querystring = require('querystring');

// let contents = fs.readFileSync(path.resolve(__dirname, './google.html'));

function getRawSearch(keyword) {
    return new Promise((resolve, reject) => {
        // return resolve(contents);
        const options = {
            method: 'GET',
            url: 'https://www.google.com/search',
            qs: {q: keyword, source: 'lnms', sa: 'X'},
            headers: {
                'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b2',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
                'cache-control': 'max-age=0,no-cache',
                authority: 'www.google.com'
            },
        };
        request(options, function (error, response, body) {
            if (error) return reject(error);
            resolve(body)
        });
    });
}

async function getDataSearchFromGoogle(keyword) {
    let html = await getRawSearch(keyword);
    let $ = cheerio.load(html, {decodeEntities: false});
    let scripts = $('#rso > div');
    console.log(scripts.length);
    if (scripts.length > 1) scripts = scripts.eq(scripts.length - 1);
    let data = [];
    scripts.each(function (index) {
        let item = $(this);
        // console.log(item.html())
        let text_ele = item.find('h3 > a');
        let link_ele = item.find('div > div > div > cite');
        let l_ele = item.find('h3 > a');
        // console.log(l_ele.attr('href'))

        let text = _.unescape(text_ele.html());
        let link = link_ele.html();

        data.push({text, link});
    });
    // console.log(data.length, data)
    return data;
}

async function search(keyword) {
    let data = await getDataSearchFromGoogle(keyword);
    console.log(data)
}

module.exports = {
    search
}

search('hotgirl')