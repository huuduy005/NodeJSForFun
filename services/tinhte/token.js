const cheerio = require('cheerio');
const LruCache = require('lru-cache');
const request = require('request');
const Tokens = require('../../models/token');

const regex = /,"ott":"([\d,a-zA-Z]*)"/gm;

const TOKEN = new LruCache({maxAge: 600000});

function getToken() {
    return new Promise((resole, reject) => {
        request('https://tinhte.vn', (err, response, body) => {
            let $ = cheerio.load(body);
            let scripts = $('body > script');
            scripts.each(function (index) {
                let text = $(this).html();
                if (text) {
                    let token = regex.exec(text)[1]
                    console.log(`>> Get token from tinhte.vn`, token);
                    resole(token)
                }
            });
        });
    })
}

const s_token = 'token';

module.exports = async () => {
    if (TOKEN.has(s_token)) {
        return TOKEN.get(s_token);
    } else {
        let token = await getToken();
        TOKEN.set(s_token, token);
        return token;
    }
    // let token = '0,1544695831,456bfd47b5c2c0a63cd2e17b729adbc8,lxi7g2zolu';
    // return token;
};
