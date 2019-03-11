const cheerio = require('cheerio');
const {CronJob} = require('cron');
const {makeRequest} = require('../../utils');
const {sendText, sendRich} = require('./viber');

const {Message: MessageType} = require('viber-bot');
const {RichMedia, Text} = MessageType;

function getHtml() {
    const options = {
        method: 'GET',
        url: 'https://tiki.vn/sales/order/trackingDetail',
        qs: {code: '438043719', _lc: 'Vk4wMzkwMDgwMTU%3D'},
        headers: {
            'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
            'upgrade-insecure-requests': '1',
            referer: 'https://tiki.vn/sales/order/history?_lc=Vk4wMzkwMDgwMTU%3D',
            cookie:
                '_gcl_au=1.1.1888054480.1546221525; TIKI_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGlraS52biIsInN1YiI6IjI0ODkxMyIsImV4cCI6MTU3OTc5NTY1OCwiaWF0IjoxNTQ4MjU5NjU4LCJjdXN0b21lcl9pZCI6IjI0ODkxMyJ9.WpJCp2USqDE6xAIq0KRfng64QbR5Y42TWInEamBuP-LfwnALL40OLlfXh5yoyp2HEcWIx-WS9Vml-DH_sNYnSDYHyeOlZdEx-aug35ZJwStvqnSqOc_XkZKfk5nhvt-ZCO5TlDLSDHnWY3vFYvPtgGbFW5ep43K08q6XI1oRiJCiKqkl4c0Ol9kryCMN5-v8aNdlIJQkR1DDGo4gDpXdHAuzmKSohII_A0JOQbkSZMLOBewGe51-P-EoDJ70yAR5leTp85stTcfnvIYC6N5Rkf3NiCoiSmuRT25EKycnkm3nuH3P12oXLKb1N7Wbbt2fNsTxvcexgPqBqUzPFDyxF-wi4lOJFk1TIHoqYJhrjY6fmnuiMhycBbwqoaWpu0RI9Df0QsyCtgPw4G8HVY2W09CBYyCTRZvRQMHI9yvQUrEmDoQARxv_2zvjHsA7m9Z1EPmDOmUyjZgIDVFDZTTFIrWubD-Bsi2NJdn9quQ9uXZb9zuHjXfy7haiqJ9B3yh2rKyswUHtS91-tOXRzG5s41cYKsxq5lanjsWKvc_7pGhHIpTsnrymHLVntdRy7RdjstRtFueJRC-ZVdGuAB4AO03aeW_FG3Rev7lspJpmBoxgjkiUykAu0XlBuNm4mMkljhRd0NtSPqVGovXzPrqK6EBoZSnwPg7tmfCP2-NjNNo; TIKI_USER=4ayI2lQp1fzgg8m8tEZvhd8j%2BVEbHUQN4vN1qwLHqnQErUg9waLmbznYyQYyvU59tJ6CIcvDGQ%3D%3D; tkc_uid=y6JRu1xR3qUJAyc/GzrkAg==; ai_client_id=10810476561.1551520721; au_aid=10810476561; au_gt=1551520721; _ants_services=%5B%22cuid%22%5D; _gcl_aw=GCL.1551884840.CjwKCAiA_P3jBRAqEiwAZyWWaH_hHtv-zSN4FFBk-CRdo5uvbwLjm7KuLCX-Kg4jb8ctNSnhbDLxcBoCTrEQAvD_BwE; TIKI_RECOMMENDATION=b6438161ee3e5b787371bfc08170eb1a; delivery_zone=Vk4wMzkwMDgwMTU%3D; _ants_utm_v2=eyJzb3VyY2UiOiJhY2Nlc3N0cmFkZSIsIm1lZGl1bSI6IjRZZ1VZVEo0RFNEajc1N0o5MnlBRVhP%0D%0ARGhKejBYNGM3ZDlsbzJOTFRMT3VUMHBVaiIsImNhbXBhaWduIjoiQUZGX05CUl9BQ1RfQUZNX1NO%0D%0AQ19BTExfVk5fQUxMX1VOS19VTksiLCJjb250ZW50IjoiIiwidGVybSI6IiIsInR5cGUiOiJkaXJl%0D%0AY3QiLCJ0aW1lIjoxNTUyMjE3MTcxMjcxLCJjaGVja3N1bSI6IioifQ%3D%3D; TKSESSID=bba77b883bf3bdfd4db4df92818c0bf8; _pk_ref.638735871.2fc5=%5B%22%22%2C%22%22%2C1552271199%2C%22https%3A%2F%2Fwww.facebook.com%2F%22%5D; TIKI_CART=ZFMeHmnF2Bd0hLBcfu0Yvw82uhy9OYBH3l8RSP347iayzY49Encbgtgy7lpaepSSX8MwvWlFRrQIDudZ9yfWzA%3D%3D; _pk_id.638735871.2fc5=2050d8363b9022ed.1551520721.11.1552272670.1552271199.; an_session=zrzlziznzgzjznzdzizjzrzizjznzkzlzmzlzizdzizmzmzhzhzkzizhzjzizdzhzdzizmzmzhzhzkzhzlzkzhzdzizmzmzhzhzkzhzlzkzhzdzjzdzhzdzizd2f27zdzjzdzlzmzkzjzl; dgs=1552272672%3A3%3A0',
            'cache-control': 'max-age=0',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        },
        gzip: true
    };
    return makeRequest(options);
}

let lastTime = '';

function genContent($) {
    let listUpdate = $('.list-update-status');
    let items = listUpdate.find('> div.item');

    let lastUpdate = items
        .eq(0)
        .find('b')
        .text();
    let timeGiaoHang = $('.checkout-bar li.last > span').text().trim();
    let item = items.eq(1);
    let timeUpdate = item.find('.left').text();
    if (timeUpdate === lastTime) return null;
    lastTime = timeUpdate;
    let text = item.find('.right').text().trim();
    return genRichMedia({lastUpdate, timeUpdate, text, timeGiaoHang});
    return `${lastUpdate}
=> ${itemTime} - <b>${item.find('.right').text()}</b>
${time}`;
}

async function main() {
    let html = await getHtml();
    let $ = cheerio.load(html);
    let text = genContent($);
    if (!text) return;
    console.log('Send text', text);
    return sendRich(text);
}

const CRON_TIME = '*/30 * * * *';

function doJob() {
    main().catch(err => console.log(err));
}

doJob();
const myCronJob = new CronJob(CRON_TIME, doJob, null, true, 'Asia/Ho_Chi_Minh');


function addACard({lastUpdate, timeUpdate, text, timeGiaoHang}) {
    let data = {
        url_path: 'dien-thoai-iphone-xs-max-64gb-hang-chinh-hang-p4538569.html'
    };
    let product = {
        id: 4538581,
        thumbnail_url: 'https://salt.tikicdn.com/cache/550x550/ts/product/65/af/4a/7e9fbfeb44a9cb39e96a180ba4f1caca.jpg'
    }
    let link = `https://tiki.vn/${data.url_path}?spid=${product.id}`;
    let card = [
        {
            Columns: 6,
            Rows: 3,
            Silent: true,
            ActionType: 'open-url',
            ActionBody: link,
            Image: product.thumbnail_url
        },
        {
            Columns: 6,
            Rows: 2,
            Silent: true,
            Text: `${lastUpdate}\n<b>${timeUpdate}</b> - ${text}`,
            ActionType: 'open-url',
            ActionBody: link,
            TextSize: 'large',
            TextVAlign: 'middle',
            TextHAlign: 'left'
        },
        {
            Columns: 6,
            Rows: 1,
            Silent: true,
            Text: `${timeGiaoHang}`,
            ActionType: 'open-url',
            ActionBody: link,
            TextSize: 'medium',
            TextVAlign: 'middle',
            TextHAlign: 'left'
        }
    ];
    return card;
}

function genRichMedia({lastUpdate, timeUpdate, text, timeGiaoHang}) {
    let raw = {
        Type: 'rich_media',
        ButtonsGroupColumns: 6,
        ButtonsGroupRows: 6,
        BgColor: '#FFFFFF',
        Buttons: [...addACard({lastUpdate, timeUpdate, text, timeGiaoHang})]
    };

    return new RichMedia(raw);
}
