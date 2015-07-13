// Diamond Dog v1.0 Server
// An Express.js & Node.js powered starter kit for apps and sites.

// LOAD .ENV
require('dotenv').load();

// LIBRARIES
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var stylus = require('stylus');
var nib = require('nib');
var tumblr = require('tumblr.js');
var moment = require('moment');

// EXPRESS APP
var app = express();

// TEMPLATE ENGINE - JADE
app.set('views', './views');
app.set('view engine', 'jade');

// STYLUS MIDDLEWARE
var compileStylus = function(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
};

app.use(stylus.middleware({src: __dirname + '/public', compile: compileStylus}));
app.use(express.static(__dirname + '/public'));

// Use body-parser for parsing requests:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cookie-parser for getting and setting cookies:
app.use(cookieParser());

// CSRF protection:
app.use(csrf({ cookie: true }));

// Load Tumblr client:
var tumblr_client = tumblr.createClient({ consumer_key: process.env.TUMBLR_APIKEY });


// ROUTES
app.get('/', function(req, res) {
  tumblr_client.posts('alacritystudios.tumblr.com', { limit: 8, filter: 'html' }, function (err, data) {
    if (data) {
      res.render('blog', {
        moment: moment,
        tumblr: data.posts
      });
    }
  });
});

app.get('/about', function(req, res) {
  res.render('about', {});
});

// PING ROUTES (for testing)
// app.get('/ping', function(req, res) {
//   console.log('PING received, GET');
//   res.send('PONG - Method: GET');
// });
//
// app.post('/ping', function(req, res) {
//   console.log('PING received, POST');
//   console.log(req.body);
//   res.send('PONG - Method: POST');
// });


// SERVER SETTINGS
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('alacritystudios is listening at http://%s:%s', host, port);
});
