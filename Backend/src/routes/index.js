const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/quest');
});

module.exports = router;