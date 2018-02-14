var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');

// var session = require("express-session");
// var passport = require("passport");
// var flash = require("connect-flash");
// var LocalStrategy = require("passport-local");
// var passportLocalMongoose = require("passport-local-mongoose");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var appRoutes = require('./routes/app');
// var geocoder = require('geocoder');
var user = require('./models/user');
var trainer = require('./models/trainer');
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
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser);
// passport.deserializeUser(User.deserializeUser);
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
app.use('/login',express.static('login'));
// app.use('',express.static('chat'));

app.get("/",function(req,res){
    res.render("home");
});

// app.get("/secret",isLoggedIn,function(req,res){
//     res.send('hi there');
// });


// var UserSchema = mongoose.Schema({
//     name:String,
//     trainer:{type: Schema.Types.ObjectId},
//         email        : String,
//         password     : String
//     });
// var TrainerSchema = mongoose.Schema({
//         name:String,
//         users:[{type: Schema.Types.ObjectId}],
//             email        : String,
//             password     : String
//         });
//
//         var user = mongoose.model('user',UserSchema);
//         var trainer = mongoose.model('trainer',TrainerSchema);
//////// create


app.post("/user",function(req,res){

  const newUser = new user({
      name:req.body.username,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password,10)
    });
    newUser.save((error,result)=>{
      if(error){
        return res.status(500).json({
          title: 'An error occured',
          error: error
        });
      }else{
        res.status(201).json({
          message:'User successfully saved to db',
          obj: result
        });
        res.redirect('/user/home');
      }
    });
});

app.post("/trainer",function(req,res){

  const newTrainer = new trainer({
      name:req.body.trainername,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password,10)
    });
    newTrainer.save((error,result)=>{
      if(error){
        return res.status(500).json({
          title: 'An error occured',
          error: error
        });
      }else{
        res.status(201).json({
          message:'User successfully saved to db',
          obj: result
        });
        res.redirect('/trainer/home');
      }
    });
});

////////////




////////login

router.post('/login/user', function (req, res, next) {

    user.findOne({email: req.body.email},function(error,user){
      if(error){
        console.log('here');
        return res.status(500).json({
          title: 'An error occured',
          error: error
        });
      }if(!user){
              console.log('here1');
        return res.status(401).json({
          title: 'Login failed',
          error:{message:'Invalid email'}
        });
      }
        if(!bcrypt.compareSync(req.body.password,user.password)){
                console.log('here2');
          return res.status(401).json({
            title: 'Login failed',
            error:{message:'Invalid password'}
        });
      }
            console.log('here3');
      var token = new jwt.sign({user: user},'secret',{expiresIn:7200});
      res.status(200).json({
        message: 'successfully logged in',
        token: token,
        userId: user._id
      });
    });
  });

  router.post('/login/trainer', function (req, res, next) {

      society.findOne({email: req.body.email},function(error,society){
        if(error){
          return res.status(500).json({
            title: 'An error occured',
            error: error
          });
        }if(!user){
          return res.status(401).json({
            title: 'Login failed',
            error:{message:'Invalid email'}
          });
        }
          if(!bcrypt.compareSync(req.body.password,society.password)){
            return res.status(401).json({
              title: 'Login failed',
              error:{message:'Invalid password'}
          });
        }
        var token = new jwt.sign({society: society},'secret2',{expiresIn:7200});
        res.status(200).json({
          message: 'successfully logged in',
          token: token,
          trainerId: trainer._id,
        });
      });
    });

///////////////////////////

//
// // Login Page
//
// app.get("/login",function(req,res){
//     res.render("login");
// });
//
// app.post("/login",passport.authenticate("local",{
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }),function(req,res){ //As post request to check login credentials
// });
//
// // Logout
// app.get("/logout",function(req, res) {
//     req.logout();
//     res.redirect("/");
// });
//
// //=========
// //Middleware
// //==========
//
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
//


app.listen(process.env.PORT || 8080,process.env.IP,()=>{
  console.log('server started');
});

// module.exports = app;
