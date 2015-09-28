'use strict';

var celery = require('node-celery');

export function getText(articles, cb) {

  var articles = articles.map(article => {
    return {
      url : article.url,
      sentimentValue : article.value
    };
  });

  var client = celery.createClient({
    CELERY_BROKER_URL: process.env.CELERY_BROKER_URL || 'amqp://guest:guest@localhost:5672/',
    CELERY_RESULT_BACKEND: 'amqp',
    CELERY_TASK_SERIALIZER: 'json'
  });

  client.on('error', err => {
    console.log(err);
  })

  var result = {};

  client.on('connect', () => {

    articles.forEach((article, i) => {
      if (Object.keys(result).length > 5) return;

      setTimeout(() => {
        result[i] = client.call('framework.tasks.visit',
                                [article.url, article.sentimentValue]);

        result[i].on('ready', data => {
          cb(null, data);
        });
      }, 250);

    });

  });
}
