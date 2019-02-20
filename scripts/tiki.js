const _ = require('lodash');
const {CronJob} = require('cron');
const numeral = require('numeral');
const request = require('request');

const {send} = require('../services/skype');

const options = {
    method: 'GET',
    url: 'https://tiki.vn/api/v2/products/4533169',
    json: true
};

function getInfo() {
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}


require('../mongoose')();
let id = '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E';

function human(num) {
    return numeral(num).format('0,0');
}

async function main() {
    let data = await getInfo();
    console.log(data);
    let products = _.get(data, 'configurable_products');
    console.log(products);
    let attachments = products.map(product => ({
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
            title: `${human(product.price)} đ`,
            subtitle: `${product.name} - ${product.price}`,
            text: product.option1,
            images: [{url: product.thumbnail_url}]
        }
    }));
    console.log(attachments[0].content);
    let res = await send(id, 'hello', {attachments});
}


main().catch(err => console.log(err));

// console.log(numeral(26990000).format('0,0'));

const CRON_TIME = '0 6-23/2 * * *';

const myCronJob = new CronJob(CRON_TIME, () => {
    main().catch(err => console.log(err));
}, null, true, 'Asia/Ho_Chi_Minh');
