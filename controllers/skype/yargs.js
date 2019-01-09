const yargs = require('yargs');

const TinhTeServices = require('../../services/tinhte');
const YoutubeServices = require('../../services/youtube');
const SimSimiServices = require('../../services/simsimi/index');
const GalaxyHandle = require('./handle/galaxy');
const InstagramHandle = require('./handle/instagram');

const sendToUser = require('./utils/sendToUser');

function noop() {
}

function sendMess(text, data) {
    sendToUser(data.from.id, data.conversation.id, text, data).then(res => console.log(JSON.stringify(res)));
}

const tinhte = {
    command: ['tinhte', 'tt'],
    describe: 'get lastest topics tinhte',
    builder: noop,
    handler: async function (argv) {
        let {mess, data} = argv;
        let text = await TinhTeServices.getLastThreads();
        sendMess(text, data)
    }
};

const youtube = {
    command: ['youtube [action]', 'yt'],
    describe: 'youtube',
    builder: noop,
    handler: async function (argv) {
        let {mess, data} = argv;
        let text = await YoutubeServices.getTrending();
        sendMess(text, data)
    }
};

const instagram = {
    command: 'instagram [id_rpofile] [num]',
    describe: '',
    builder: noop,
    handler: function (argv) {
        let {mess, data} = argv;
        InstagramHandle(mess, data);
    }
};

const galaxy = {
    command: 'galaxycine',
    describe: [],
    builder: noop,
    handler: function (argv) {
        let {mess, data} = argv;
        GalaxyHandle(mess, data);
    }
};

const unknown = {
    command: '*',
    describe: [],
    builder: noop,
    handler: async function (argv) {
        let {mess, data} = argv;
        let text = await SimSimiServices.getText(mess, data);
        sendToUser(data.from.id, data.conversation.id, text, data).then(res => console.log(JSON.stringify(res)));
    }
};

const parser = yargs
    .command(tinhte)
    .command(youtube)
    .command(instagram)
    .command(galaxy)
    .command(unknown)
    .help();

module.exports = (mess, data) => {
    parser.parse(mess, {mess, data}, (err, argv, output) => {
    });
};