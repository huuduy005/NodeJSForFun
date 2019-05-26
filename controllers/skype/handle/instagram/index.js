const getProfileData = require('../../../../services/instagram/profile');
const {sendTextWithImage, sendSuggestToUser} = require('../../../../services/skype');
const _ = require('lodash');

const list_profile = ['supershuu'];

async function getListProfile(id) {
    let suggestion = list_profile.map(profile => ({type: 'imBack', title: profile, value: `instagram ${profile}`}));
    // console.log(suggest);
    sendSuggestToUser(id, {text: 'Chọn profile m muon xem anh moi nhat', suggestion});
}

async function getImageProfile(id_profile, num, id_user) {
    let data = await getProfileData(id_profile);
    let images = _.take(data, num);
    let urls = images.map(image => {
        return image.node.display_url;
    });
    let first = data[0].node;
    let text = `Caption: ${id_profile}\n` + _.get(first,'edge_media_to_caption.edges[0].node.text', 'deo tim thay caption :D');
    let url = first.display_url;
    // console.log(text, url);
    sendTextWithImage(id_user, text, urls);
}

module.exports = (mess, data) => {
    console.log('instagram');
    const regex_profile = / *[instagram|ig] ([^ ]+) ?(\d*)$/;
    let m;
    let id = data.conversation.isGroup ? data.conversation.id : data.from.id;
    if ((m = regex_profile.exec(mess))) {
        let id_instagram = m[1];
        let num = m[2] || 1;
        console.log('get profile', id_instagram);
        getImageProfile(id_instagram, num, id);
    } else {
        console.log('show list profile');
        getListProfile(id);
    }
};

let data = {
    __source__: 'skype',
    topicName: 'Hiệp hội trai ngành xiaolin ',
    type: 'conversationUpdate',
    timestamp: '2018-12-27T03:09:44.806Z',
    channelId: 'skype',
    serviceUrl: 'https://smba.trafficmanager.net/apis/',
    from: {
        id: '29:1G6fFff4M3OKfCldLGqD7SpfCWcp8ZTYOPlwXmZtbH4E'
    },
    conversation: {
        isGroup: true,
        id: '19:fd121046e22c47d182a02c1d5732b59d@thread.skype'
    },
    recipient: {
        id: '28:fc8c192b-9c4f-47dd-a8a9-e045505434e4',
        name: 'Bibu'
    },
    __v: 0
};

// module.exports('instagram h.viviha 10', data);
