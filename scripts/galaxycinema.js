const _ = require('lodash');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const request = require('request');

const SkypeService = require('../services/skype');
require('../mongoose')();

function getSchedule(id) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: 'https://www.galaxycine.vn/api/session/movie/7a85c298-c9ab-42c0-8e42-6be35c95db72',
      json: true
    };

    request(options, function(error, response, body) {
      if (error) return reject(error);
      resolve(body);
    });
  });
}

function getDate() {
  let now = moment();
  return {
    now,
    firstMondayOfMonth: moment(now).startOf('months').weekday(1),
    t: moment(now).weekday(7),
    tuesdayOfWeek:
      now.weekday() <= 2
        ? now.weekday(2)
        : moment(now)
          .add(7, 'days')
          .weekday(2)
  };
}

const FORMAT = 'DD/MM/YYYY';

async function scripts() {
  console.log(`>> Run at  ${moment().format('YYYY-MM-DD HH:mm.SSS')}`)
  let schedule = await getSchedule();
  let filter = schedule.filter(rap => _.includes(['galaxy-tan-binh'], rap.slug));
  let target = getDate();
  // console.log(filter);
  for (let rap of filter) {
    console.log(`>> Rạp ${rap.name}`);
    let d = rap.dates;
    for (let _d of d) {
      let b = _d.bundles;
      console.log(`\t${_d.dayOfWeekLabel} - ${_d.showDate}`);
      let res = b.map(obj => {
        console.log('*', obj.caption === 'voice' ? 'Thuyết minh' : 'PD');
        let sessions = obj.sessions;
        let text = sessions.map(o => `${o.showTime} (${o.screenName}) - Trống ${o.seatsAvailable}`).join(', ');
        console.log(text);
        return text;
      });

      // console.log(target.t.format(FORMAT));
      if (_d.showDate == target.tuesdayOfWeek.format(FORMAT)) {
        console.log('Send boss');
        let text = `${_d.dayOfWeekLabel} - ${_d.showDate} => ` + res.join(' <|> ');
        SkypeService.sendTextToUser(text, '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E').then(res => console.log(res));
      }

    }
  }
}


// console.log(getDate().firstMondayOfMonth.format('DD/MM'), getDate().tuesdayOfWeek.format('DD/MM'));

const CRON_TIME = '*/5 * * * *';
const myCronJob = new CronJob(CRON_TIME, scripts, null, true, 'Asia/Ho_Chi_Minh');
scripts();
