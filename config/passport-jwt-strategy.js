const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const env = require("./environment");

//extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require("../models/users");

//Passport-JWT stores User object in request headers.
//headers contain JWT token
let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret //key to encrpt and decrpt
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log("error in finding user from jwt")
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))

module.exports = passport;

