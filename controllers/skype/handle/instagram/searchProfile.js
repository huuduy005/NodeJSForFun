const _ = require('lodash');
const {search: searchProfile} = require('../../../../services/instagram/search');
const {send} = require('../../../../services/skype/index.js');
const sendToUser = require('../../utils/sendToUser');

let user = {
    pk: '8239203018',
    username: 'ph_trinh18',
    full_name: '',
    is_private: false,
    profile_pic_url:
        'https://instagram.fsgn5-1.fna.fbcdn.net/vp/6bdc033d1b0273f42df8bcdf20b64d13/5D8970D3/t51.2885-19/s150x150/44705473_188617408724621_5529190049029029888_n.jpg?_nc_ht=instagram.fsgn5-1.fna.fbcdn.net',
    profile_pic_id: '1904544777228514018_8239203018',
    is_verified: false,
    has_anonymous_profile_picture: false,
    follower_count: 243,
    byline: '243 người theo dõi',
    mutual_followers_count: 0,
    unseen_count: 0
};

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
    const chunks = _.chunk(users, 3);

    for (let chunk of chunks) {
        const attachments = chunk.map(({user}) => genAUserCard(user));
        console.log(attachments);
        await send(id, 'Tao test thử nha', {attachments});
    }
}

module.exports = {
    search
};
