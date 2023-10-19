const express = require("express");
const passport = require("passport");

const router = express.Router();

const usersController = require("../controllers/user_controller");

//restricting is user loged in only then go to /profile
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/signup',passport.checkLogin,usersController.signup);
router.post("/signupuser",usersController.signupUser);
router.get("/signin",passport.checkLogin,usersController.signin);
router.get("/signout",usersController.signout);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

//callback url
router.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:"/users/signin"}),usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

//use passport as middleware to authenticate
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
 ), usersController.createSession);

router.get("/forgetpassword",usersController.forgetPassword);
router.post("/forgetpassword",usersController.forget_password);

router.get("/resetpassword/:token",usersController.resetPasswordEmail);
router.post("/resetpassword",usersController.reset_Password_Email);

//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
module.exports = router;