const _ = require('lodash');
const {makeRequest} = require('../../utils');

function genOptions({keyword}) {
    const options = {
        method: 'GET',
        url: 'https://www.instagram.com/web/search/topsearch/',
        qs: {context: 'blended', query: keyword, rank_token: '0.9533385224563686', include_reel: 'true'},
        headers: {
            Connection: 'keep-alive',
            Host: 'www.instagram.com',
            'x-ig-app-id': '936619743392459',
            'x-requested-with': 'XMLHttpRequest',
            authority: 'www.instagram.com',
            referer: 'https://www.instagram.com/',
            accept: '*/*',
            'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
            'accept-encoding': 'gzip, deflate, br'
        },
        gzip: true,
        json: true
    };

    return options;
}

async function search(keyword) {
    const opts = genOptions({keyword});
    const resultAPI = await makeRequest(opts);
    let users = _.get(resultAPI, 'users', []);
    // filter tài khoàng private, chỉ trả public
    users = _.filter(users, (item) => !_.get(item, 'user.is_private', true));
    return users;
}

module.exports = {
    search
};
