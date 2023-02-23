const User = require("../../../models/users");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

//create jwt
module.exports.createSession =async function(req,res)
{
    try{   
     let user =await User.findOne({email: req.body.email});
     if(!user || user.password != req.body.password)
     {
        //422 invalid input
        return res.status(422).json({
            message: "Invalid username or password"
        })
     }  
     return res.status(200).json({
        message: "Sign in successful, here is your token, please keep it safe",
        data:{
            //must be same key used for decrpt
            token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '100000'})
        }
     })  
    }catch(err){
           return res.status(500).json({
            message: "Internal Server Error...",
           })
    }
}