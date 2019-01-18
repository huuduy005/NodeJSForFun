const getProfileData = require('../../../../services/instagram/profile');
const {sendImagesWithTitle, sendSuggestToUser} = require('../../../../services/skype');
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
    let dataImages = images.map(image => {
        return {
            title: _.get(image,'node.edge_media_to_caption.edges[0].node.text', 'deo tim thay caption :D'),
            url:image.node.display_url};
    });
    let first = data[0].node;
    let text = `Caption: ${id_profile}\n` + _.get(first,'edge_media_to_caption.edges[0].node.text', 'deo tim thay caption :D');
    let url = first.display_url;
    console.log(text, url);
    sendImagesWithTitle(id_user, text, dataImages);
}

module.exports = (mess, data) => {
    console.log('instagram');
    const regex_profile = / *instagram ([^ ]+) ?(\d*)$/;
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
