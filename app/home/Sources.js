'use strict;'

var pg = require('pg');
var conString = process.env.API_DB_URL || 'postgres://localhost/testdb2';

export function getValuatedSources(cb) {

  pg.connect(conString, (err,client,done) => {

    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(
      'SELECT * FROM sentimentbysource ORDER BY created ASC;',
      [],
      (err,result) => {
        if(err) return console.error('error running query', err);

        cb(null, result.rows);
        client.end();

      });

  });

}
