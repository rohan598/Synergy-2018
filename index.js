var express = require('express');
var path = require('path');
var request = require('request');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');

// var session = require("express-session");
// var passport = require("passport");
// var flash = require("connect-flash");

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var appRoutes = require('./routes/app');
// var geocoder = require('geocoder');
var user = require('user');
var trainer = require('trainer');
var app = express();


mongoose.connect("mongodb://localhost/Synergy");
mongoose.connection.once('open',()=>{
  console.log('connection estblished');
}).on('error',error=>console.log(error));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(session({
//     secret: "loda lassan",
//     resave: false,
//     saveUninitialized: false
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(flash());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
//
// app.use('/signin',signinRoutes);
// app.use(express.static('public'));
// app.use('/', appRoutes);

var options = {
  url: '/sign'
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
  }
}

request(options, callback);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

app.listen(process.env.PORT || 8080,process.env.IP,()=>{
  console.log('server started');
});

// module.exports = app;
