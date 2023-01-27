const express = require("express");
const passport = require("passport");

const router = express.Router();

const usersController = require("../controllers/user_controller");

//restricting is user loged in only then go to /profile
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.post("/signupuser",usersController.signupUser);
router.get("/signin",usersController.signin);
router.get("/signout",usersController.signout);


//use passport as middleware to authenticate
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
 ), usersController.createSession);


//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
module.exports = router;