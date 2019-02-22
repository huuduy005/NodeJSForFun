const {
    PATH: {LOGS}
} = require('config');
const winston = require('winston');
const {format, transports} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf(({level, message, timestamp}) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const name = 'viber';

winston.loggers.add('viber', {
    format: combine(
        timestamp(),
        myFormat
    ),
    ...getTransports(`${name}`)
});

function getTransports(name, options = {}) {
    let {noConsole = false} = options;
    let res = {
        transports: [new transports.File({filename: LOGS + `/${name}.log`})],
        exceptionHandlers: [new transports.File({filename: LOGS + `/${name}_exception.log`})]
    };
    if (!noConsole && process.env.NODE_ENV !== 'production') {
        res.transports.push(new transports.Console());
    }
    return res;
}
