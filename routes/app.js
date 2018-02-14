// var express = require('express');
// var router = express.Router();
// router.get('/', function (req, res, next) {
//     res.render('index');
// });
// module.exports = router;
//
//
// module.exports = function(app,passport){
//
// //================
// // Basic Routes ==
// //================
//
//     //================
//     // Homepage ======
//     //================
//
//     app.get("/",function(req,res){
//         res.render("index");
//     });
//
//     //================
//     // CSI page ======
//     //================
//
//     app.get("/csi",isLoggedIn,function(req, res) {
//         res.render("csi",{user : req.user});
//     });
//
//
//     //=================
//     // Sign Up=========
//     //=================
//
//     // Sign Up page
//     app.get("/signup",function(req,res){
//         res.render("signup",{message: req.flash('signupMessage')});
//     });
//
//      // process the signup form
//     app.post('/signup', passport.authenticate('local-signup', {
//         successRedirect : '/csi', // redirect to the secure profile section
//         failureRedirect : '/signup', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));
//
//     //================
//     // LOGIN =========
//     //================
//
//     // Login page
//     app.get("/login",function(req,res){
//         res.render("login");
//     });
//     app.get("/loginform",function(req, res) {
//        res.render("loginform",{message: req.flash('loginMessage')});
//     });
//     app.post('/loginform', passport.authenticate('local-login', {
//         successRedirect : '/csi', // redirect to the secure profile section
//         failureRedirect : '/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));
//     //================
//     // Logout ========
//     //================
//
//     app.get("/logout",function(req, res) {
//         req.logout();
//         res.render("logout");
//     });
//
// // =============================================================================
// // AUTHENTICATE (FIRST LOGIN) ==================================================
// // =============================================================================
//
//     // Local authentication
//
//
//
//     // Facebook authentication
//     app.get('/auth/facebook',
//       passport.authenticate('facebook',{scope: ["email,manage_pages"]}),
//       function(req, res){
//       });
//      app.get('/auth/facebook/callback',
//             passport.authenticate('facebook', {
//                 successRedirect : '/csi',
//                 failureRedirect : '/login'
//             }));
//
//     // Google authentication
//     app.get('/auth/google',
//       passport.authenticate('google',{scope: ['profile','email']}),
//       function(req, res){
//       });
//      app.get('/auth/google/callback',
//             passport.authenticate('google', {
//                 successRedirect : '/csi',
//                 failureRedirect : '/login'
//             }));
//
// // =============================================================================
// // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// // =============================================================================
//
//     // Local authorization
//         app.get('/connect/local', function(req, res) {
//             res.render('connect-local', { message: req.flash('loginMessage') });
//         });
//         app.post('/connect/local', passport.authenticate('local-signup', {
//             successRedirect : '/csi', // redirect to the secure profile section
//             failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
//         }));
//
//     // Facebook authorization
//         // send to facebook to do the authentication
//         app.get('/connect/facebook', passport.authorize('facebook', { scope : ['email','manage_pages'] }));
//
//         // handle the callback after facebook has authorized the user
//         app.get('/connect/facebook/callback',
//             passport.authorize('facebook', {
//                 successRedirect : '/csi',
//                 failureRedirect : '/'
//             }));
//
//       // Google authorization
//         // send to google to do the authentication
//         app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
//
//         // the callback after google has authorized the user
//         app.get('/connect/google/callback',
//             passport.authorize('google', {
//                 successRedirect : '/csi',
//                 failureRedirect : '/'
//             }));
//
// // =============================================================================
// // UNLINK ACCOUNTS =============================================================
// // =============================================================================
// // used to unlink accounts. for social accounts, just remove the token
// // for local account, remove email and password
// // user account will stay active in case they want to reconnect in the future
//
//     // Local unlinking
//     app.get('/unlink/local', function(req, res) {
//         var user            = req.user;
//         user.local.email    = undefined;
//         user.local.password = undefined;
//         user.save(function() {
//             res.redirect('/csi');
//         });
//     });
//
//
//     //  Facebook unlinking
//     app.get('/unlink/facebook', function(req, res) {
//         var user            = req.user;
//         user.facebook.token = undefined;
//        user.save(function() {
// 			res.redirect('/csi');
// 		});
//     });
//
//     // Google unlinking
//     app.get('/unlink/google', function(req, res) {
//         var user          = req.user;
//         console.log(req.user);
//         user.google.token = undefined;
//         user.save(function() {
// 			res.redirect('/csi');
// 		});
//     });
//
//     //==============
//     // Middleware ==
//     //==============
//
//     function isLoggedIn(req,res,next){
//         if(req.isAuthenticated()){
//             return next();
//         }
//         res.redirect("/login");
//     }
//
// };
