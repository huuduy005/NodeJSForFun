const url = require('url');

function parseURL(URL) {
    let myURL = url.parse(URL);
    const regex = /.*p(\d+).html$/gm;

    let m = regex.exec(myURL.pathname);
    let id = +m[1];

    return {
        id,
        ...myURL
    };
}

module.exports = {
    parseURL
};

let URL = 'https://tiki.vn/dien-thoai-iphone-xs-64gb-hang-chinh-hang-p4533169.html?src=recently-viewed&2hi=1';
console.log(parseURL(URL));
