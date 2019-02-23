const express = require('express');
const router = express.Router();

const abc = require('./abc');
const users = require('./users');
const api = require('./api');
const webhook = require('./webhook');
const test = require('./test');
const firebase = require('./firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/abc/:lang', handle, abc);
router.use('/abc', handle, abc);

router.use('/users', users);
router.use('/api', api);
router.use('/webhook', webhook);
//alias webhook
router.use('/webhooks', webhook);
router.use('/test', test);
router.use('/firebase', firebase);

module.exports = router;

function handle(req, res, next) {
    console.log('h', req.params);
    req.params.lang = 'vi';
    console.log('h2', req.params);
    next();
}
