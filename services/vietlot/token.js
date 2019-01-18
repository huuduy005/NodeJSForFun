const cheerio = require('cheerio');
const request = require('request');
const vm = require('vm');

async function getToken() {
    let data = await getDataFromYoutube();
    console.log(data);
}

function getRawTinhTe() {
    return new Promise((resole, reject) => {
        request('https://vietlott.vn', (err, response, body) => {
            if (err) return reject(err);
            resole(body);
        });
    });
}

async function getDataFromYoutube() {
    let html = await getRawTinhTe();
    let $ = cheerio.load(html);

    let scripts = $('script');
    let content = $('body .kqth > .box_kqtt_nd_chinh');

    let mega_6_45 = $('body > div.page.home.theme1 > div.kqth > div > div.box_kqtt.box_kqtt_red > div > div.zone.col-md-7.border_left_right > div > div.content > div > div.so_tien > h3');
    console.log(mega_6_45.html());
    let power_6_55 = $('body > div.page.home.theme1 > div.kqth > div > div.box_kqtt.box_kqtt_orange > div > div.zone.col-md-7.border_left_right > div > div.content > div > div.tong_so_tien > div > div:nth-child(1) > div > h3');
    console.log(power_6_55.html());

    let power_6_55_2 = $('body > div.page.home.theme1 > div.kqth > div > div.box_kqtt.box_kqtt_orange > div > div.zone.col-md-7.border_left_right > div > div.content > div > div.tong_so_tien > div > div:nth-child(2) > div > h3');
    console.log(power_6_55_2.html());

    const sandbox = {window: {}};
    const context = new vm.createContext(sandbox);

    scripts.each(function(index) {
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

module.exports = async () => {
    let token = await getToken();
};

getToken();
