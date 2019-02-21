const numeral = require('numeral');

function humanPrice(num) {
    return numeral(num).format('0,0');
}

module.exports = {
    humanPrice
};
