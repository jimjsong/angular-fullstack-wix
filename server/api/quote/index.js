'use strict';

var express = require('express');
var controller = require('./quote.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/reload', controller.reload);
module.exports = router;
