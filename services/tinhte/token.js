const cheerio = require('cheerio');
const LruCache = require('lru-cache');
const request = require('request');
const vm = require('vm');
const Tokens = require('../../models/token');

const regex = /,"ott":"([\d,a-zA-Z]*)"/gm;

const TOKEN = new LruCache({maxAge: 600000});

async function getToken() {
    let data = await getDataFromYoutube();
    // console.log(data);
    return data.__NEXT_DATA__.props.pageProps.apiConfig.ott;
}

function getRawTinhTe() {
    return new Promise((resole, reject) => {
        request('https://tinhte.vn', (err, response, body) => {
            if (err) return reject(err);
            resole(body);
        });
    })
}

async function getDataFromYoutube() {
    let html = await getRawTinhTe();
    let $ = cheerio.load(html);

    let scripts = $('body > script');

    const sandbox = {window: {}};
    const context = new vm.createContext(sandbox);

    scripts.each(function (index) {
        let text = $(this).html();
        if (text) {
            try {
                let script = new vm.Script(text);
                script.runInContext(context);
            } catch (e) {
                // console.log('Loi - ', index);
                // console.error(e)
            }
        }
    });

    return sandbox;
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

// getToken().then(token => console.log(token))