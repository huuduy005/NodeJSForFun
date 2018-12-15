const request = require('request');

function getText_1(text) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: 'https://dangtinhhaui.000webhostapp.com/sim.php',
      qs: {text},
      headers: {
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
        // 'accept-encoding': 'gzip, deflate, br',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'upgrade-insecure-requests': '1',
        authority: 'dangtinhhaui.000webhostapp.com'
      },
      json: true
    };
    // return reject();

    request(options, function(error, response, body) {
      if (error) return reject(error);
      let text = body.messages[0].text.replace('\n\n\n', '');
      resolve(text);
    });
  });
}

function getText_2(text) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: 'https://syle.000webhostapp.com/sim.php',
      qs: {text},
      headers: {
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
        // 'accept-encoding': 'gzip, deflate, br',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'cache-control': 'max-age=0,no-cache',
        authority: 'syle.000webhostapp.com'
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) return reject(error);
      let text = body.messages[0].text.replace('\n\n\n', '');
      resolve(text);
    });
  });
}

function getText_3(text) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: 'http://api.minhhieu.asia/vi.php',
      qs: {text},
      headers: {
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
        // 'Accept-Encoding': 'gzip, deflate',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive'
      }
    };

    request(options, function(error, response, body) {
      if (error) return reject(error);
      let text = body.replace('\n\n\n', '');
      text = text.trim();
      resolve(text);
    });
  });
}

const APIS = [getText_1, getText_2, getText_3];
let index = 0;

function getIndex(index) {
  return index % APIS.length;
}

module.exports = async (text) => {
  let count = 0;
  while (count < APIS.length) {
    try {
      // console.log('try', count, index);
      let get = APIS[index];
      return await get(text);
    } catch (e) {
      console.error('Call simi fail', index, e);
      index = getIndex(++index);
      count++;
    }
  }
};

// let text = 'dasu gank team 20 gg';
//
// async function test() {
//   for (let f of APIS) {
//     let res = await f(text);
//     console.log(res);
//   }
// }

// module.exports(text).then(res => {
//   console.log(res);
//   return module.exports(text);
// }).then(res => console.log(res));
