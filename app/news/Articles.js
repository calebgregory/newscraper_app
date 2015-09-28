'use strict';

var pg = require('pg');
var conString = process.env.API_DB_URL || 'postgres://localhost/testdb2';

export function getValuatedArticles(newsSource, pageNumber, mood, cb) {

  pg.connect(conString, (err,client,done) => {

    if(err) {
      return console.error('error fetching client from pool', err)
    }

    var numberPerPage = 5;
    var start = (pageNumber - 1) * numberPerPage;

    // select 'positive' news stories, 5 at a time, starting at the page_number * 5
    // then send to controller
    var queryString =
      mood === 'posi' ?
      "SELECT * FROM linkswithsentiment WHERE sourcename = $1 AND value > 0 ORDER BY created DESC LIMIT $2 OFFSET $3;" :
      "SELECT * FROM linkswithsentiment WHERE sourcename = $1 AND value < 0 ORDER BY created DESC LIMIT $2 OFFSET $3;";
    client.query(queryString,
                 [newsSource.toString(), numberPerPage.toString(), start.toString()],
                 (err, result) => {

      if(err) {
        return console.error('error running query', err);
      }

      cb(null, result.rows)
      client.end();

    });

  });

}
