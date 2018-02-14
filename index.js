var express = require('express');
var path = require('path');
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
app.use('/',express.static('home'));
app.use('/sign',express.static('Sign'));



// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     return res.render('index');
// });

app.listen(process.env.PORT || 8080,process.env.IP,()=>{
  console.log('Server running on port 8080');
});

// module.exports = app;
