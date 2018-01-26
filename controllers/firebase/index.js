let request = require("request");

function sendNotiDesk (id, data) {
    if (!id){
        console.log('id firebase rỗng')
        return;
    }
    let options = {
        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers:
            {
                Authorization: 'key=AAAAhGDdTSg:APA91bE0TqpD_2SdhYoVEV2kTENxstVn5VW8vQMHX-CWsnV3_POVtP1w0iuOez0yV4goEUGxTcJuQoo8w4-P3CS4UuLMTTKbJNM-DmQFUwSzHJ8eaLwuUlX4BfvVX-sjzV8bagLaQLNc',
                'Content-Type': 'application/json'
            },
        body:
            {
                notification:
                    {
                        title: data.title,
                        body: data.text,
                        click_action: data.link
                    },
                to: id
            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log('firebase', body)
        console.log(`Send Noti Desk OK:\n${id}\n${data.text}-${data.link}`);
    });
}

module.exports = {
    sendNotiDesk
}
