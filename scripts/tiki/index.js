const _ = require('lodash');
const {CronJob} = require('cron');

const {getInfo, ajaxProductRender} = require('../../services/tiki/api');
const sendSkype = require('./skype');
const sendViber = require('./viber');
require('../../mongoose')();

const list_pid = [4533169, 4538569]; //XS, XS Max

async function main() {
    list_pid.forEach(async pid => {
        let data = await getInfo(pid);
        console.log(data);
        let products = _.get(data, 'configurable_products');
        let productRenders = await Promise.all(products.map(({id: spid}) => ajaxProductRender(pid, spid)));
        console.log(products);
        let objData = {data, products, productRenders};
        await Promise.all([sendSkype(objData), sendViber(objData)]);
    });
}

const CRON_TIME = '0 0,6-23/2 * * *';

function doJob() {
    main().catch(err => console.log(err));
}

doJob();
const myCronJob = new CronJob(CRON_TIME, doJob, null, true, 'Asia/Ho_Chi_Minh');
