'use strict';

var Sources = require('./Sources')

export function index(req,res) {

    res.render('home/index',
               { page : 'Home' });
};

export function sourceData(req,res) {
  Sources.getValuatedSources((err,data) => {
    if(err) console.log(err);

    res.send(data);
  });
}
