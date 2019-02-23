const _ = require('lodash');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

let writeStream = fs.createWriteStream('secret.txt');

// write some data with a base64 encoding
// writeStream.write('aef35ghhjdk74hja83ksnfjk888sfsf');

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
  console.log('wrote all data to file');
});

// close the stream
// writeStream.end();

function getOptions(page) {
  return {
    method: 'POST',
    url: 'http://samsung.techrum.vn/loadComments',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {news_id: '28', page},
    json: true
  };
}

function getComments(page) {
  let options = getOptions(page);
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) return reject(error);

      // console.log(body);
      resolve(process(body));
    });
  });
}

function write(comments) {
  let c = _.sortBy(comments, ['user', 'age']);

  c.forEach(comment => {
    let text = `${comment.author}|${comment.comment}\n`;
    writeStream.write(text);
  });
  writeStream.end();
}

async function scripts() {
  let end = Math.floor(24615 / 10) + 1;
  console.log(end);
  let arr = _.range(1, end);
  let arr_chunk = _.chunk(arr, 5);
  let res = [];
  for (let range of arr_chunk) {
    console.log(range);
    let r = await Promise.all(range.map(page => getComments(page)));
    r.forEach(_r => res.push(..._r));
  }
  write(res);
}

scripts();

let data = {
  status: 1,
  onload: [
    '$(\'#comment-list\').html("    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1380191312084748&height=400&width=400&ext=1546529298&hash=AeQV651uKwvTY-Z-)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Ph\\u00fac V\\u00f5 H\\u1ed3ng<span> \\u2022 21 hours ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL, n\\u1ed5i b\\u1eadt l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - tinh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tinh c\\u00f3 li\\u00ean quan, bao g\\u1ed3m ch\\u1ee7 th\\u1ec3, th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc, \\u00e1nh s\\u00e1ng, d\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 0607<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1380191312084748&height=400&width=400&ext=1546529298&hash=AeQV651uKwvTY-Z-)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Ph\\u00fac V\\u00f5 H\\u1ed3ng<span> \\u2022 21 hours ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL, n\\u1ed5i b\\u1eadt l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - tinh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tinh c\\u00f3 li\\u00ean quan, bao g\\u1ed3m ch\\u1ee7 th\\u1ec3, th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc, \\u00e1nh s\\u00e1ng, d\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 0407<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1380191312084748&height=400&width=400&ext=1546529298&hash=AeQV651uKwvTY-Z-)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Ph\\u00fac V\\u00f5 H\\u1ed3ng<span> \\u2022 21 hours ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL, n\\u1ed5i b\\u1eadt l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - tinh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tinh c\\u00f3 li\\u00ean quan, bao g\\u1ed3m ch\\u1ee7 th\\u1ec3, th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc, \\u00e1nh s\\u00e1ng, d\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 1910<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1380191312084748&height=400&width=400&ext=1546529298&hash=AeQV651uKwvTY-Z-)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Ph\\u00fac V\\u00f5 H\\u1ed3ng<span> \\u2022 21 hours ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL, n\\u1ed5i b\\u1eadt l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - tinh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tinh c\\u00f3 li\\u00ean quan, bao g\\u1ed3m ch\\u1ee7 th\\u1ec3, th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc, \\u00e1nh s\\u00e1ng, d\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 1602<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=1380191312084748&height=400&width=400&ext=1546529298&hash=AeQV651uKwvTY-Z-)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Ph\\u00fac V\\u00f5 H\\u1ed3ng<span> \\u2022 21 hours ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL, n\\u1ed5i b\\u1eadt l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - tinh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tinh c\\u00f3 li\\u00ean quan, bao g\\u1ed3m ch\\u1ee7 th\\u1ec3, th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc, \\u00e1nh s\\u00e1ng, d\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 1002<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=870634519811358&height=400&width=400&ext=1546215427&hash=AeQyR_P2Z04JLkNh)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Yen Kim<span> \\u2022 4 days ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL , n\\u1ed5i b\\u1eadt nh\\u1ea5t l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - T\\u00ednh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tin c\\u00f3 li\\u00ean quan , bao g\\u1ed3m ch\\u1ee7 th\\u1ec3 , th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc , \\u00e1nh s\\u00e1ng, \\u0111\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 4500<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=870634519811358&height=400&width=400&ext=1546215427&hash=AeQyR_P2Z04JLkNh)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Yen Kim<span> \\u2022 4 days ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL , n\\u1ed5i b\\u1eadt nh\\u1ea5t l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - T\\u00ednh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tin c\\u00f3 li\\u00ean quan , bao g\\u1ed3m ch\\u1ee7 th\\u1ec3 , th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc , \\u00e1nh s\\u00e1ng, \\u0111\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 4499<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=870634519811358&height=400&width=400&ext=1546215427&hash=AeQyR_P2Z04JLkNh)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Yen Kim<span> \\u2022 4 days ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL , n\\u1ed5i b\\u1eadt nh\\u1ea5t l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - T\\u00ednh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tin c\\u00f3 li\\u00ean quan , bao g\\u1ed3m ch\\u1ee7 th\\u1ec3 , th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc , \\u00e1nh s\\u00e1ng, \\u0111\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 4498<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=870634519811358&height=400&width=400&ext=1546215427&hash=AeQyR_P2Z04JLkNh)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Yen Kim<span> \\u2022 4 days ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL , n\\u1ed5i b\\u1eadt nh\\u1ea5t l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - T\\u00ednh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tin c\\u00f3 li\\u00ean quan , bao g\\u1ed3m ch\\u1ee7 th\\u1ec3 , th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc , \\u00e1nh s\\u00e1ng, \\u0111\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 4497<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <div class=\\"comment\\">\\n        <div class=\\"user-pic\\" style=\\"background-image:url(https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=870634519811358&height=400&width=400&ext=1546215427&hash=AeQyR_P2Z04JLkNh)\\"><\\/div>\\n        <div class=\\"content\\">\\n            <div class=\\"name\\">Yen Kim<span> \\u2022 4 days ago<\\/span><\\/div>\\n            <div class=\\"txt\\">camera note 9 t\\u00edch h\\u1ee3p AL , n\\u1ed5i b\\u1eadt nh\\u1ea5t l\\u00e0 c\\u00f4ng c\\u1ee5 nh\\u1eadn di\\u1ec7n b\\u1ed1i c\\u1ea3nh scene Optimizer - T\\u00ednh n\\u0103ng gi\\u00fap ph\\u00e2n t\\u00edch c\\u00e1c th\\u00f4ng tin c\\u00f3 li\\u00ean quan , bao g\\u1ed3m ch\\u1ee7 th\\u1ec3 , th\\u1eddi gian, r\\u1ed3i t\\u1ef1 \\u0111\\u1ed9ng t\\u1ed1i \\u01b0u m\\u00e0u s\\u1eafc , \\u00e1nh s\\u00e1ng, \\u0111\\u1ed9 t\\u01b0\\u01a1ng ph\\u1ea3n sao cho ph\\u00f9 h\\u1ee3p - 4496<\\/div>\\n        <\\/div>\\n    <\\/div>\\n")'
  ]
};

function process(data) {
  const regex = /\$\('#comment-list'\).html\((.*)\)/;
  let text = regex.exec(data.onload[0]);
  text = JSON.parse(text[1]);
  let $ = cheerio.load(text);
  let res = [];
  $('.comment').each(function(index) {
    let comment_ele = $(this);
    let author = comment_ele.find('.content .name').text();
    let comment = comment_ele.find('.content .txt').text();
    // console.log(author, comment);
    res.push({author, comment});
  });
  return res;
}

process(data);
