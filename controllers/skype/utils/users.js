const Users = require('../../../models/user');

const defaultChanel = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';
const chanel_id = '19:1ba78d76f663407b96b46c72be8da946@thread.skype';
const chanel_id_2 = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';

function getListToSend (ids) {
    return new Promise((resolve, reject) => {
        if (ids && ids.length === 0) {
            resolve([defaultChanel]);
            return;
        }
        let list_id = ids.map((id) => {
            return {
                'id_jira': id
            }
        });
        Users.find({$or: list_id}, (err, users) => {
            if (err || !users || (users && users.length === 0)) {
                resolve([{id_skype: defaultChanel}]);
                return;
            }
            let ids_skype = users.map(user => ({id_skype: user.id_skype, id_firebase: user.id_firebase}));

            //TODO: Mặc đinh thêm channel Noti vào danh sách gửi
            ids_skype.push({id_skype: defaultChanel});

            resolve(ids_skype);
        })
    })
}

module.exports = getListToSend;