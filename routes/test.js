const express = require('express');
const router = express.Router();
const config = require('config');

/* GET users listing. */
router.all('/', function(req, res, next) {
    res.json(config);
});

module.exports = router;
