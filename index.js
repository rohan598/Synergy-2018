var express = require('express');
var path = require('path');
var request = require('request');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
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
var socket = require('socket.io');
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
app.use('/chat',express.static('chat'));
app.use('/login/user',express.static('user'));
app.use('/login/trainer',express.static('trainer'));
// app.use('',express.static('chat'));

app.get("/",function(req,res){
    res.render("home");
});

var socket = require('socket.io');

// App setup
var server = app.listen(8080, function(){
    console.log('listening for requests on port 8080,');
});

// Socket setup & pass server
// var io = socket(server);
// io.on('connection', (socket) => {
//
//     console.log('made socket connection', socket.id);
//
//     // Handle chat event
//     socket.on('chat', function(data){
//         // console.log(data);
//         io.sockets.emit('chat', data);
//     });
//
//     // Handle typing event
//     socket.on('typing', function(data){
//         socket.broadcast.emit('typing', data);
//     });
//
// });
//
//
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });
//

//////// create


app.post("/user",function(req,res){

  const newUser = new user({
      name:req.body.username,
      membId: req.body.memId,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password,10),
      trainer:req.body.trainerId
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
        trainer.findOne({trainerId: result.trainerId},function(error,trainer){
            if(error){
              console.log(error);
            }else{
              trainer.name = trainer.name;
              trainer.trainerId = trainer.trainerId;
              trainer.email =trainer.email;
              trainer.password = trainer.password;
              trainer.users.push(result.userId);
              trainer.save((error,result)=>{
                if(error){
                  return res.status(500).json({
                    title: 'An error occured',
                    error: error
                  });
            }else{
              res.status(201).json({
                message:'User successfully updated',
                obj: result
              });
            }
          });
            }
        }
      );
    }
    });
});

app.post("/trainer",function(req,res){

  const newTrainer = new trainer({
      name:req.body.trainername,
      trainerId: req.body.trainerId,
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
      }
    });
});

////////////




////////login

app.post('/login/user', function (req, res, next) {

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
        uId: user._id
      });
    });
  });

  app.post('/login/trainer', function (req, res, next) {

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
          tId: trainer._id,
        });
      });
    });

///////////////////////////

///////// edit

app.put("/user/:id",function(req,res){

    user.findById(req.params.userId,function(err,result){
      if(err){
          console.log('not updated');
          res.redirect("/user");
      }
      else{
        result.name = req.body.username || result.username;
        result.memId = req.body.memId || result.memId;
        result.email = req.body.email || result.email;
        result.password = req.body.password || result.password;
        result.trainer = req.params.trainerId; // send trainerId
        result.save((error,result)=>{
          if(error){
            return res.status(500).json({
              title: 'An error occured',
              error: error
            });
      }else{
        res.status(201).json({
          message:'User successfully updated',
          obj: result
        });
      }
    });
      }
    });
});

app.put("/trainer/:id",function(req,res){

    trainer.findById(req.params.trainerId,function(err,result){
      if(err){
          console.log('not updated');
          res.redirect("/user");
      }
      else{
        result.name = req.body.trainername || result.trainername;
        result.trainerId = req.body.trainerId || result.trainerId;
        result.email = req.body.email || result.email;
        result.password = req.body.password || result.password;
        result.users.push(req.params.userId); // send userId
        result.save((error,result)=>{
          if(error){
            return res.status(500).json({
              title: 'An error occured',
              error: error
            });
      }else{
        res.status(201).json({
          message:'Trainer successfully updated',
          obj: result
        });
      }
    });
  }
});
});

//////////////////////

////// get if validated

app.get('/user',function(req,res){
    jwt.verify(req.query.token,'secret',function(err,decoded){
      if(err){
        return res.status(401).json({
          title: 'Not Authenticated',
          error: err
        });
      }
      user.findById(uId,function(error,user){
          if(error){
            return res.status(500).json({
              title: 'An error occured',
              error: error
            });
          }else{
                res.status(200).json({
                message:'User successfully found in db',
                obj: user
              });
            }
        });
    });
  });


////////////

//////// mailing facility

//// template
var serverConfig  = {
  gmail: {
      client_user :  'fororderonly24@gmail.com',
      clientId:"763448251226-6joontbt0trrjdtufao5c8lqbl3nu367.apps.googleusercontent.com",
      clientSecret:"n0jexasMGvGtaOn3h9paoVSc",
      refreshToken:'1/XwShalYxGZ_JlVXeZ22q66xw0ep6z_OyccOZQDsMhdm9gie7T_bmqi3fhY5fUzsr',
      accessToken:'ya29.GltiBX5P7dRCy2n65P6zEZX00DSgakFwMugCLi4A_8M3M5E56Qu5SfHJkTxXilgdkuZswMilB_Rbp4763Qde7j6AULVRpsHxVEctexDoq674uuMl92A3QA69MJah',
      expires: 3600
  }
};
var transporter = nodemailer.createTransport({
  service:'Gmail',
   auth: {
    type: 'OAuth2',
    user: serverConfig.gmail.client_user,
    clientId: serverConfig.gmail.client_id,
    clientSecret: serverConfig.gmail.secret,
    refreshToken: serverConfig.gmail.refresh_token,
    accessToken: serverConfig.gmail.accessToken
  }
});

/// send mail

app.get('/mail',function(req,res){

  const mailOptions = {
    from: '${req.data.from}', // sender address
    to: '${req.data.to}', // list of receivers
    subject: '${req.data.subject}', // Subject line
    text    : '${req.data.content}', // plaintext body
    html    : `<p>${req.data.content}</p>`, // html body
    attachDataUrls : true
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err);
     else
       console.log(info);
  });
});



///////////////////


// var server = app.listen(process.env.PORT || 8080,process.env.IP,()=>{
//   console.log('server started');
// });

// module.exports = app;
