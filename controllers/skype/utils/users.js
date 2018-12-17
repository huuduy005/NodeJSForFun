const Users = require('../../../models/user');

const defaultChanel = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';
const chanel_id = '19:1ba78d76f663407b96b46c72be8da946@thread.skype';
const chanel_id_2 = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';

async function getListToSend(ids) {
    if (ids && ids.length === 0) return [{id_skype: defaultChanel}];

    let list_id = ids.map((id) => ({'id_jira': id}));
    try {
        let users = await Users.find({$or: list_id});
        if (!users || (users && users.length === 0)) return [{id_skype: defaultChanel}];

        let ids_skype = users.map(user => ({
            id_jira: user.id_jira,
            id_skype: user.id_skype,
            id_firebase: user.id_firebase
        }));

        //TODO: Mặc đinh thêm channel Noti vào danh sách gửi
        ids_skype.push({id_skype: defaultChanel});
        return ids_skype;
    } catch (e) {
        console.error('Fail get users', e);
        return [{id_skype: defaultChanel}];
    }
}

module.exports = getListToSend;