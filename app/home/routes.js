'use strict';

var express = require('express')
  , router  = express.Router();

var ctrl = require('./controller');

router.get('/', ctrl.index);
router.get('/sourcedata', ctrl.sourceData);

module.exports = router;
