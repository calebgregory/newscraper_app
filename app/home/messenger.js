'use strict';

var celery = require('node-celery');
export function tokenize(message, cb) {
  var client = celery.createClient({
    CELERY_BROKER_URL: 'amqp://guest:guest@localhost:5672//',
    CELERY_RESULT_BACKEND: 'amqp',
    CELERY_TASK_SERIALIZER: 'json'
  });

  client.on('connect', () => {
    var result = client.call('framework.tasks.tokenize', [message]);
    result.on('ready', data => {
      cb(null, data);
    });
  });
}
