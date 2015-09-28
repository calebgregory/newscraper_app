var errorhandler = require('errorhandler');

var app          = require('../../../app');

var env          = app.get('env');

module.exports = () => {
  /* eslint-disable no-unused-vars */
  if (env === 'production') {
    return (err, req, res, next) => {
      var status = 500;
      var msg = 'Internal Server Error';

      res.status(status).format({
        html: () => {
          res.send(`<html><head><title>${msg}</title></head><body><h1>${msg}</h1></body></html>`);
        },
        json: () => {
          res.json({
            error: { message: msg }
          });
        }
      });
    };
  } else {
    return errorhandler();
  }
};
