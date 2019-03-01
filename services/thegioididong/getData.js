const cheerio = require('cheerio');
const {makeRequest} = require('../../utils');

async function getData(url) {
    let html = await makeRequest({
        method: 'GET',
        url
    });
    const $ = cheerio.load(html);
    let price_sale = $('aside.price_sale');
    let area_price = price_sale.find('.area_price');

    let list = price_sale.find('.c_m div > a.item');
    let data = list.map((index, element) => {
        let p = $(element);
        let option = p.find('span');
        let price = p.find('strong');
        console.log(option.text(), price.text());
        return {
            option: option.text(),
            price: price.text()
        }
    }).get();

    return data;
}

let url = 'https://www.thegioididong.com/dtdd/iphone-xs-max';
getData(url).then(res => console.log(res));
