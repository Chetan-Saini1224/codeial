const userSchema = require("../models/users")


module.exports.profile = function(req,res)
{
   return res.render('users',{title:"users profile"});    
}



//for creating user
module.exports.signup = function(req,res)
{   
   return res.render("signup",{title:"signUp"}); 
}

module.exports.signupUser = function(req,res)
{   
   //check if exist;
   userSchema.findOne({email: req.body.email},(err,user) => {
      
       if(err){
         console.log(err);
         return 
       }
      
       if(!user)
       {
         userSchema.create(req.body,(err,newUser) =>{
            if(err)
            {
               console.log(err);
               return res.redirect("signup");
            } 
            console.log(newUser);
            return res.redirect("signin");
         })
       }

       else
       {
         console.log("user already exist");
         return res.redirect("signup");
       }

   })

}



//For Login
module.exports.signin = function(req,res)
{ 
   console.log(req.cookies)  
   res.cookie('user_id',"234");
   res.cookie('someOne',"says blalala");
   return res.render("signin",{title:"signIn"}); 
}

module.exports.createSession = function(req,res)
{   
   return res.render("signin",{title:"signIn"}); 
}





