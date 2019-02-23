const _ = require('lodash');
const {CronJob} = require('cron');

const {send} = require('../services/skype');
const {getInfo, ajaxProductRender} = require('../services/tiki/api');
const {humanPrice} = require('./utils');

require('../mongoose')();
let id = '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E';

async function main() {
    let pid = 4533169;
    let data = await getInfo(pid);
    console.log(data);
    let products = _.get(data, 'configurable_products');
    let p = await Promise.all(products.map(({id: spid}) => ajaxProductRender(pid, spid)));
    console.log(products);
    // let im = product.images.map(image => ({url: image.large_url}));
    let attachments = products.map((product, i) => ({
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
            title: `${humanPrice(product.price)} đ`,
            subtitle: `${product.name} - ${product.price}`,
            text: product.option1 + '\n' + `In stock ${p[i].stock_item.qty}`,
            // text: 'hi',
            images: [{url: product.thumbnail_url}]
        }
    }));
    console.log(attachments[0].content);
    let res = await send(id, 'hello', {attachments});
}

// console.log(numeral(26990000).format('0,0'));

const CRON_TIME = '0 0,6-23/2 * * *';

function doJob() {
    main().catch(err => console.log(err));
}

doJob();

const myCronJob = new CronJob(CRON_TIME, doJob, null, true, 'Asia/Ho_Chi_Minh');
