//passport is an authentication middleware
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/users");

//authentication using passport : authenticating user
passport.use(new LocalStrategy({
    usernameField: 'email'},
    function(email,password,done)
    {
        // find a user and establish the identity
        User.findOne({email: email},function(err,user) {
            if(err)
            {
                console.log("error in finding user --> Passport");
                return done(err);
            }
            if(!user || user.password != password)
            {
                console.log("invalid username password");
                return done(null,false); 
            }
            return done(null,user);
        })
    }     
))


//Passport uses serializeUser function to persist user data (after successful authentication) into session. 
//Function deserializeUser is used to retrieve user data from session.



//If authentication succeeds, a session will be established and maintained via a cookie set in the user’s browser. 
//However, if a user logs in and refreshes the page, 
//the user data won’t persist across HTTP requests. 
//We can fix this by serializing and deserializing users.
//Serializing a user determines which data of the user object should be stored in the session, usually the user id.
//serailize the user :- if user sign in find the id send it to cokkie and cookie send to browser
passport.serializeUser(function(user,done){
      done(null,user.id);
});


//browser request handle hear :- deserialize the user id again
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("error in finding user --> Passport");
            return done(err);
        }
        return done(null,user);
    })
})

//check if user is authenticated
passport.checkAuthentication = function(req,res,next)
{
    //if usersigned in , then pass on the next function i.e controller action 
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/users/signin');
}

//set the user for the views
passport.setAuthenticatedUser = function(req,res,next) {
    if(req.isAuthenticated())
    {
        //if user signed in user info available in req.user passport handle this.
        //because we used user model
        //session cookie store this data
        //we are just sending this to local for view
        res.locals.user = req.user;
    }
    next();
}







module.exports = passport;



