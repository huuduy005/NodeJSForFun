const {send} = require('../../services/skype');
const {humanPrice} = require('../utils');

let id = '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E';

async function sendMess({data, products, productRenders}){
    let attachments = products.map((product, i) => ({
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
            title: `${humanPrice(product.price)} đ`,
            subtitle: `${product.name} - ${product.price}`,
            text: product.option1 + '\n' + `In stock ${productRenders[i].stock_item.qty}`,
            // text: 'hi',
            images: [{url: product.thumbnail_url}]
        }
    }));
    console.log(attachments[0].content);
    let res = await send(id, 'hello', {attachments});
}

module.exports = sendMess;
