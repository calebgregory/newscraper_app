'use strict';

var app                        = require('../../app/')
  , handleInternalServerErrors = require('./lib/internalServer')
  , handleNotFoundErrors       = require('./lib/notFound');

app.use(handleNotFoundErrors());
app.use(handleInternalServerErrors());
