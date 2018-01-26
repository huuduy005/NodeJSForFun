/**
 * Created by huudu on 20/12/2016.
 */
let express = require('express');
let router = express.Router();
const UsersModel = require('../models/user');


router.post('/setToken', function (req, res) {
    console.log('TOKEN RECEIVED: ' + req.body.token);
    console.log('jira_id', req.body.jira_id);
    let id_firebase = req.body.token;
    let id_jira = req.body.jira_id;
    UsersModel.findOne({
        id_jira: id_jira
    }, (err, user_r) => {
        if (!user_r) {
            let n_user = new UsersModel({
                name: id_jira,
                id_jira: id_jira,
                id_firebase: id_firebase,
            });
            n_user.save((result) => {
                if (result) {
                    console.log('Có lỗi khi lưu user', user);
                    return;
                }
                console.log('Thêm user thành công', result);
            })
        } else {
            user_r.id_firebase = id_firebase;
            if (!user_r.name) user_r.name = id_jira;
            user_r.save((result) => {
                if (result) {
                    console.log('Có lỗi khi cập nhật user', user);
                    return;
                }
                console.log('Cập nhật thành công');
            })
        }
    });
    res.json({})
});

router.get('/*', function (req, res) {
    let data = {id: req.query.jira_id};
    res.render('firebase', data);
});

module.exports = router;
