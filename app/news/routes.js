'use strict';

var express = require('express')
  , router  = express.Router();

var ctrl = require('./controller');

module.exports = function(io) {
  router.get('/', ctrl.index);
  router.get('/:source/page/:page/:mood', ctrl.page(io));

  return router;
};
