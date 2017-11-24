const request = require('request');
const _ = require('lodash');
const token = require('./utils/token');
const UsersModel = require('../../models/user');
const createActionText = require('./utils/createActionText');
const getListToSend = require('./utils/users');
const jira_api = require('./utils/jire_api');

const regex = /\/\/([A-Z]*)/g;

const regex_command = /\/\/SET JIRA_ID=([A-Za-z\._\-@#]+)/g;
const regex_test_cmd = /^\/\/SET/;
const regex_jira_id = /\[\~([A-Za-z.]+)\]/g;

//TODO: Nhận thông tin từ skype
function receive(req) {
    let body = req.body;
    let text = body.text;
    let user = body.from;
    let conversation = body.conversation;

    if (regex_test_cmd.test(text)) {
        progressCommand(user, conversation, text, body);
    } else {
        sendToUser(user, conversation, '', body);
    }
}

function sendToSkype(data) {
    let issue = data.issue;
    let watches = issue.fields.watches;
    let actionText = createActionText(data);

    new Promise((resolve, reject) => {
        //TODO: Lấy thông tin các watchers (ids_jira)
        if (watches) {
            jira_api.getWatcher(watches.self || null).then((watchers) => {
                //TODO: Thêm thằng assignee
                let assignee = issue.fields.assignee;
                watchers.push(assignee.name);
                resolve(watchers);
            });
        } else {
            resolve([]);
        }
    }).then((watchers) => {
        //TODO: Nếu là comment thì lấy id_jira người được tags vào
        let comment = data.comment;
        // let type = data.issue_event_type_name;
        // if (type == 'issue_commented' || type == 'issue_comment_edited') {
        if (comment) {
            let m;
            while ((m = regex_jira_id.exec(comment.body || '')) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                watchers.push(m[1]);
            }
        }
        return watchers;
    }).then((watchers) => {
        watchers = _.uniq(watchers);//TODO: Lọc các id bị trùng
        console.log('Các thành phần liên quan: ', watchers);
        //TODO: Lấy thông tin id_skpe của các watchers
        if (actionText) {
            return getListToSend(watchers);
        } else {
            return null;
        }
    }).then((ids_skype) => {
        if (!ids_skype)
            return;
        //TODO: Gửi mess cho từng id_skype
        ids_skype.forEach((id_skype) => {
            if (!id_skype) return;
            token.getToken()
                .then((token) => {
                    let options = genContentToRequest(id_skype, id_skype, token, actionText);
                    request(options, function (error, response, body) {
                        if (error) console.log('Skype - Lỗi gửi cho user: ', id_skype);
                        else console.log('Skype: SEND OK', body);
                    });
                })
        });
    })
}

function sendToUser(user, conversation, text, data) {
    token.getToken().then((token) => {
        const options = {
            method: 'POST',
            url: (data.serviceUrl ? data.serviceUrl : 'https://smba.trafficmanager.net/apis') + '/v3/conversations/' + conversation.id + '/activities/',
            headers:
                {
                    'content-type': 'application/json',
                    authorization: token
                },
            body:
                {
                    type: 'message',
                    textFormat: 'markdown',
                    text: text || 'User ID của bạn là **' + user.id + '**',
                    from: {id: 'VXR@Nnmguv_2XXw', name: 'Bibu'},
                    replyToId: user.id
                },
            json: true
        };

        console.log('ToUserWithUrl:', options.url);

        request(options, function (error, response, body) {
            if (error) {
                console.log('Lỗi cmnr send to user');
            }
            console.log('SEND TO USER', body);
        });
    })
}

function sendTextToSkype(text, users) {

    return new Promise((resolve, reject) => {
        let watchers = _.uniq(users);//TODO: Lọc các id bị trùng
        resolve(watchers);
    }).then((watchers) => {
        console.log('Thành phần liên quan GIT: ', watchers);
        //TODO: Lấy thông tin id_skpe của các watchers
        if (text) {
            return getListToSend(watchers);
        } else {
            return null;
        }
    }).then((ids_skype) => {
        if (!ids_skype)
            return;
        //TODO: Gửi mess cho từng id_skype
        ids_skype.forEach((id_skype) => {
            if (!id_skype) return;
            token.getToken()
                .then((token) => {
                    let options = genContentToRequest(id_skype, id_skype, token, text);
                    request(options, function (error, response, body) {
                        if (error) console.log('Skype - Lỗi gửi cho user: ', id_skype);
                        else console.log('Skype: SEND OK', body);
                    });
                })
        });
    })
}

module.exports = {
    receive: receive,
    sendToSkype,
    sendTextToSkype
};

function genContentToRequest(id, toId, token, text) {
    return {
        method: 'POST',
        url: 'https://smba.trafficmanager.net/apis/v3/conversations/' + id + '/activities/',
        headers:
            {
                'content-type': 'application/json',
                authorization: token
            },
        body:
            {
                type: 'message',
                textFormat: 'markdown',
                text: text,
                from: {id: 'VXR@Nnmguv_2XXw', name: 'Bibu'},
                replyToId: toId
            },
        json: true
    }
}

function progressCommand(user, conversation, text, data) {
    let m;
    if ((m = regex_command.exec(text)) !== null) {
        UsersModel.findOne({
            id_skype: user.id
        }, (err, user_r) => {
            if (!user_r) {
                let n_user = new UsersModel({
                    name: user.name,
                    id_jira: m[1],
                    id_skype: user.id,
                });
                n_user.save((result) => {
                    if (result) {
                        console.log('Có lỗi khi lưu user', user);
                        return;
                    }
                    console.log('Thêm user thành công', result);
                    sendToUser(user, conversation, 'Tạo thông tin thành công\n\n' + m[1] + '-' + user.id, data);
                })
            } else {
                user_r.id_skype = user.id;
                user_r.id_jira = m[1];
                user_r.name = user.name;
                user_r.save((result) => {
                    if (result) {
                        console.log('Có lỗi khi cập nhật user', user);
                        return;
                    }
                    console.log('Cập nhật thành công');
                    sendToUser(user, conversation, 'Cập nhật thông tin thành công\n\n' + m[1] + '-' + user.id, data);
                })
            }
        });
    } else {
        sendToUser(user, conversation, 'Command sai! Bồi bỗ Dev để được hướng dẫn :D', data);
    }
}