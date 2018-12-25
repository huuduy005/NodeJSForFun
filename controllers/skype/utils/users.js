const Users = require('../../../models/user');

const defaultChanel = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';
const chanel_id = '19:1ba78d76f663407b96b46c72be8da946@thread.skype';
const chanel_id_2 = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';

const default_chanel = {id_skype: defaultChanel, id_jira: 'default'};

async function getListToSend(ids) {
    if (ids && ids.length === 0) return [default_chanel];

    let list_id = ids.map((id) => ({'id_jira': id}));
    try {
        let users = await Users.find({$or: list_id});
        if (!users || (users && users.length === 0)) return [default_chanel];

        let ids_skype = users.map(user => ({
            id_jira: user.id_jira,
            id_skype: user.id_skype,
            id_firebase: user.id_firebase
        }));

        //TODO: Mặc đinh thêm channel Noti vào danh sách gửi
        ids_skype.push(default_chanel);
        return ids_skype;
    } catch (e) {
        console.error('Fail get users', e);
        return [default_chanel];
    }
}

module.exports = getListToSend;