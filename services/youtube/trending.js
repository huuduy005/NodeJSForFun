const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const util = require('util');
const vm = require('vm');
const request = require('request');

// let contents = fs.readFileSync(path.resolve(__dirname, './trending.html'), 'utf8');

const options = {
    method: 'GET',
    url: 'https://www.youtube.com/feed/trending',
    qs: {gl: 'VN'},
    headers: {
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
        referer: 'https://www.google.com/',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'cache-control': 'max-age=0,no-cache',
        authority: 'www.youtube.com'
    }
};

function getRawYoutube() {
    return new Promise((resolve, reject) => {
        // return resolve(contents);
        request(options, function (error, response, body) {
            if (error) return reject(error);
            resolve(body)
        });
    });
}

async function getDataFromYoutube() {
    let html = await getRawYoutube();
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

function getItems(data) {
    let items =
        data.window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer
            .contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items;

    let items_recently =
        data.window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer
            .contents[1].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items;
    return {
        trend: items,
        recently: items_recently
    };
}

async function getTrendYoutube() {
    let data = await getDataFromYoutube();
    return await getItems(data);

    // for (let item of recently) {
    //     console.log(item.videoRenderer.title.simpleText);
    //     console.log('>> Link', item.videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url);
    // }
}

module.exports = getTrendYoutube;
