'use strict';

var express   = require('express')
  , http      = require('http')
  , less      = require('less-middleware')
  , morgan    = require('morgan')
  , path      = require('path')
  , socketio  = require('socket.io');

require('../lib/config/secrets').config();

var routes  = require('./routes');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'))
  , io     = socketio.listen(server);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(less(path.join(process.cwd(),'www')));

app.locals.title = 'Entities';

app.use(morgan('dev'));

app.use(express.static((path.join(process.cwd(),'www'))));
app.use('/', routes(io));

require('../lib/errorHandler/');
