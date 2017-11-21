const request = require("request");

function getWatcher(url) {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve([]);
            return;
        }

        let options = {
            method: 'GET',
            headers: {authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'},
            url: url,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) {
                resolve([]);
                return;
            }
            let watchers = body.watchers;
            let w = [];
            if (watchers) {
                w = watchers.map((user) => {
                    return user.name;
                })
            }
            resolve(w);
        });
    })
}

module.exports = {
    getWatcher: getWatcher
};