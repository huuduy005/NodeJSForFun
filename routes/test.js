const express = require('express');
const router = express.Router();
const config = require('config');
// const program = require('commander');

/* GET users listing. */
router.all('/', function (req, res, next) {
    res.json({
        config,
        f: process.env.IS_SEND_SLACK
    })
});

// program
//     .command('exec <cmd>')
//     .description('run the given remote command')
//     .action(function(cmd) {
//         console.log('exec "%s"', cmd);
//     });
//
//
// router.all('/c', function (req, res, next) {
//
//     program.parse(['exec ' + 'test']);
//    res.json({});
// });

module.exports = router;