var socket = io();

var articles = document.getElementsByClassName('articles')[0];
var pending = document.getElementsByClassName('pending')[0];

socket.on('connect', obj => {
  console.log([
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_',
    '/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/_',
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_',
    '/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/_',
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_',
    '/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/_',
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_',
    '/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/_',
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_',
    '/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/_',
    '\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\_',
    ' \\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/  \\_\\/__\\/_/ ',
    ' /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\__/ /\\__/\\ \\_'
  ].join('\n'));
})

socket.on('news', msg => {
  pending.classList.add('hidden');
  msg = JSON.parse(msg);
  addToPage(msg);
});

function addToPage(msg) {

  var box = document.createElement('DIV');
  box.classList.add('box');

  var article = document.createElement('DIV');
  article.classList.add('internal-content');

  var h1 = document.createElement('H1');
  var a = document.createElement('A');
  a.setAttribute('href', msg.url)
  var textNode = document.createTextNode(msg.headline);
  a.classList.add('headline');
  a.appendChild(textNode);
  h1.appendChild(a);
  article.appendChild(h1);

  var h3 = document.createElement('H3');
  var textNode2 = document.createTextNode('Sentiment Value: ')
  h3.appendChild(textNode2);
  var span = document.createElement('SPAN');
  span.classList.add('sentiment-value')
  var textNode3 = document.createTextNode(msg.sentimentValue);
  span.appendChild(textNode3);
  h3.appendChild(span);
  article.appendChild(h3);

  var content = document.createElement('DIV');
  content.classList.add('content');
  article.appendChild(content);

  msg.content.forEach(paragraph => {
    var p = document.createElement('P');
    var textNode3 = document.createTextNode(paragraph);
    p.appendChild(textNode3);
    content.appendChild(p);
  });

  box.appendChild(article);
  articles.appendChild(box);
}
