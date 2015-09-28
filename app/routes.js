'use strict';

var express = require('express')
  , router  = express.Router();

var home    = require('./home/routes');
var news    = require('./news/routes')


export default function(io) {

  router.use('/', home);
  router.use('/news', news(io));

  return router;
};
