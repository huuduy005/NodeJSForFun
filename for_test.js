/**
 * Created by huudu on 5/19/2017.
 */
var moment = require('moment');

console.log(moment().unix());
console.log(Date.now());

const {CronJob} = require('cron');

let mCron = new CronJob('0 0,6-23/2 * * *', () => {
}, 'Asia/Ho_Chi_Minh');

mCron.cronTime.sendAt(24).forEach(t => {
    console.log('next', t.format('YYYY-MM-DD HH:mm:sss.SSS'));
});
// for (let i = 0; i < 24; i++) {
//     console.log('next', mCron.nextDates(i).format('YYYY-MM-DD HH:mm:sss.SSS'));
// }

