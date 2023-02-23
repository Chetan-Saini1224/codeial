const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require("../models/users");
const env = require("./environment");

//tell passport to use a new strategy
passport.use(new googleStrategy({
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url
    }, 
    function(accessToken,refreshToken,profile,done) {
        //find user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
             if(err)
             {
                console.log("error in google strategy passport ",err);
                return ;
             }
             //accesstoken: 
             //store this access token to get the various info about user
             //(can use api from google to get data with token)
             //refresh token: 
             //undefined print (unless u ask for it it wont be coming up)
             
             console.log(accessToken,refreshToken); 

             console.log(profile);
             //if found set the user as req.user
             if(user)
             {
                return done(null,user);
             } 
             else{
                //if not found, create the user and set it as set req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },(err,user) => {
                    if(err)
                    {
                        console.log("error in crrating user google strategy passport ",err);
                        return ;   
                    }
                    return done(null,user);
                }) 
             }
        })
    }
    ))



module.exports = passport;