const express = require('express');
const router = express.Router({mergeParams: true});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    console.log('abc', req.params);
    let {id, lang} = req.params;
    console.log(req.query);
    res.json({
        text: 'hello world',
        id,
        lang
    });
});

module.exports = router;
