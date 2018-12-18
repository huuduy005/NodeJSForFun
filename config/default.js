const defer = require('config/defer').deferConfig;

module.exports = {
    IS_SEND_SLACK: true,
    IS_SEND_SKYPE: true,
    ID_DEFAULT_1: '',
    mongodb: {
        host: 'ds031607.mlab.com',
        port: 31607,
        username: 'huuduy',
        password: 'huuduy',
        database: 'sticket',
        options: {},
        uri: defer(function() {
            const {host, port, username, password, database} = this.mongodb;
            return `mongodb://${username}:${password}@${host}:${port}/${database}`;
        })
    }
};
