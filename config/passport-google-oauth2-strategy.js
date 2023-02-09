const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require("../models/users");

//tell passport to use a new strategy
passport.use(new googleStrategy({
    clientID: "468337025118-572s86nojicuhgelvsl62sbk7ti4h6mq.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, 
    function(accessToken,refreshToken,profile,done){
        //find user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
             if(err)
             {
                console.log("error in google strategy passport ",err);
                return ;
             }
             //accesstoken: 
             //store this access token to get the various info about user
             //(can use api from google)
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