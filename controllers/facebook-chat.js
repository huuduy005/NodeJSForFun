/**
 * Created by huudu on 5/7/2017.
 */
var request = require('request');

const mAccessToken = 'EAATnBNPBOEgBAAZBDnJg1dv3vbKvFal6Em5LLFP7mvGInJsHjUwcODngcVa15oIhTLO6wPOauq1cIeYiWYghvOBiVRWIscou2cigeFi3JiIe4WG8C206CqxprXKfblHRSoT52JBUxPczrasAUGkev7ZAxYD3D9PFOP5U3gQgZDZD';

function sendListTemplate(senderId, data) {
    var attachment = {
        "type": "template",
        "payload": {
            "template_type": "list",
            "top_element_style": "compact",
            "elements": data,
            "buttons": [{
                "title": "Thêm nữa",
                "type": "postback",
                "payload": "payload"
            }]
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: mAccessToken
        },
        method: 'POST',
        json: {
            "recipient": {
                "id": senderId
            },
            "message": {
                "attachment": attachment
            }
        }
    });
}

module.exports = {
    sendListTemplate: sendListTemplate
};