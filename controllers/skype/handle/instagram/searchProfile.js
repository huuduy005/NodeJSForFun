const _ = require('lodash');
const {search: searchProfile} = require('../../../../services/instagram/search');
const {send} = require('../../../../services/skype/index.js');
const sendToUser = require('../../utils/sendToUser');

function genAUserCard(user) {
    const {username, profile_pic_url, byline} = user;

    return {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
            title: username,
            subtitle: byline,
            images: [{url: profile_pic_url}],
            buttons: [
                {
                    type: 'imBack',
                    title: 'Lấy hình ẻm',
                    value: `ig ${username}`
                },
                {
                    type: 'openUrl',
                    title: 'Link',
                    value: `https://www.instagram.com/${username}`
                }
            ]
        }
    };
}

async function search(keyword, data) {
    console.log('search profile handle', keyword);
    const isGroup = _.get(data, 'conversation.isGroup', false);

    let id = isGroup ? data.conversation.id : data.from.id;
    let users = await searchProfile(keyword);

    let text = `Tìm được ${users.length} ẻm`;
    await sendToUser(data.from.id, data.conversation.id, text, data);

    console.log('Send to user');
    const chunks = _.chunk(users, 5);

    for (let chunk of chunks) {
        const attachments = chunk.map(({user}) => genAUserCard(user));
        console.log(attachments);
        await send(id, 'Tao test thử nha', {attachments});
    }
}

module.exports = {
    search
};
