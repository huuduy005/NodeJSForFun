const _ = require('lodash');
const swig = require('swig');
const {resolve} = require('path');

const getTrendingData = require('./trending');

// Compile a file and store it, rendering it later
const trend_template = swig.compileFile(resolve(__dirname, './trend_template.html'));

function tranformItem(item) {
    return {
        name: item.videoRenderer.title.simpleText,
        link: `https://www.youtube.com${item.videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
    }
}

async function getTrending() {
    let data = await getTrendingData();

    let {recently} = data;
    let items = _.take(recently, 5);
    items = items.map(item => tranformItem(item));

    let text = trend_template({items});
    // console.log(text);
    return text;
}

module.exports = {
    getTrending
};
