const {UserProfile, Message: MessageType} = require('viber-bot');
const {RichMedia, Text} = MessageType;

const Bot = require('../../services/viber');
const {humanPrice} = require('../utils');

let Duy = {
    id: 'FLPFygTHV8mWPK7xJv2uKw==',
    name: 'Hữu Duy',
    avatar:
        'https://media-direct.cdn.viber.com/download_photo?dlid=W2att1zUZ6gXCUVJe1_CkzYH4SmwWVMvPRVhZxT56wTF33jVRcdJkjOEM3qM0xKB-D9Cx-o3vn6-qH7bub358qP2F4KKuuFTp8b_eYpxXHCVC89ys9GDJAZCKBZfOQCBHHvZbQ&fltp=jpg&imsz=0000',
    language: 'vi',
    country: 'VN',
    api_version: 7
};

let Ngoc = {
    id: 'igEiKHTvjwGlvRN8XEXIlQ==',
    name: 'Thanh Ngọc',
    avatar:
        'https://media-direct.cdn.viber.com/download_photo?dlid=W2att1zUZ6gXCUVJe1_CkzYH4SmyXFMvORFgYkX77QiT33LUTpBLwDHTN3iLgxHRrT8dkbpg6Hzr-H3d6eiioqfyEdff5rAPo5D4eogjAXnOBM9wKNo2Mtge1u-KFj_iyt5GkQ&fltp=jpg&imsz=0000',
    language: 'vi',
    country: 'VN',
    api_version: 7
};

const USER_LIST = [Duy, Ngoc];

function addACard({data, product, productRender}, cardList) {
    let link = `https://tiki.vn/${data.url_path}?spid=${product.id}`;
    console.log(link);
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
            Text: `<b>${humanPrice(product.price)} đ</b> - In Stock ${productRender.stock_item.qty}`,
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
            Text: `<b>${product.name} - ${product.price}</b>`,
            ActionType: 'open-url',
            ActionBody: link,
            TextSize: 'medium',
            TextVAlign: 'middle',
            TextHAlign: 'left'
        }
    ];
    return cardList.push(...card);
}

function genRichMedia({data, products, productRenders}) {
    let raw = {
        Type: 'rich_media',
        ButtonsGroupColumns: 6,
        ButtonsGroupRows: 6,
        BgColor: '#FFFFFF',
        Buttons: []
    };

    products.forEach((product, i) => {
        addACard({data, product, productRender: productRenders[i]}, raw.Buttons);
    });

    return new RichMedia(raw);
}

async function sendMess({data, products, productRenders}) {
    let message = genRichMedia({data, products, productRenders});

    return Promise.all(
        USER_LIST.map(userObject => {
            let user = UserProfile.fromJson(userObject);
            return Bot.sendMessage(user, message).catch(err => {
                console.log(err);
            });
        })
    );
}

module.exports = sendMess;

module.exports.sendText = text => {
    let message = new Text(text);

    let user = UserProfile.fromJson(Duy);
    return Bot.sendMessage(user, message).catch(err => {
        console.log(err);
    });
};

module.exports.sendRich = message => {
    let user = UserProfile.fromJson(Duy);
    return Bot.sendMessage(user, message).catch(err => {
        console.log(err);
    });
};
