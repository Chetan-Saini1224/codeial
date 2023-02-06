const userSchema = require("../models/users")
const fs = require("fs");
const path = require("path");

module.exports.profile = function(req,res)
{
   userSchema.findById(req.params.id,function(err,user){
      return res.render('users',{
         title:"users profile",
         profile_user:user
      }); 
   })
   
}


module.exports.update = async function(req,res)
{
   if(req.user.id == req.params.id)
   {
         try
         {
            let user = await userSchema.findById(req.params.id);
            userSchema.uploadedAvatar(req,res,function(err){
               if(err)
               {
                  console.log("Multerr Error :" ,err);
                  return res.redirect("back");
               }
               console.log(req.file); //multer provide this req.file
               user.name = req.body.name;
               user.email = req.body.email;                
               if(req.file)
               {
                  //this is saving the path of uploaded file into avatar field
                  if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))) 
                  {
                     //to delete file
                     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  }
                  user.avatar = userSchema.avatarPath + req.file.filename;
               }
               user.save();
               return res.redirect("back");
            })
         }
         catch(err){
            req.flash('error',err);
            return res.redirect('back');
         }
   }
   else{
      return res.status((401).send('Unauthorized'));
   }  
}


//for creating user
module.exports.signup = function(req,res)
{   
   if(req.isAuthenticated())
   {
      return res.redirect("profile")
   }
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
            req.flash('success','Login to continue');
            return res.redirect("signin");
         })
       }

       else
       {
         req.flash('error','User Already Exist');
         console.log("user already exist");
         return res.redirect("signup");
       }

   })

}



//For Login
module.exports.signin = function(req,res)
{ 
   // console.log(req.cookies)  
   // res.cookie('user_id',"234");
   // res.cookie('someOne',"says blalala");
   if(req.isAuthenticated())
   { 
      return res.redirect("profile");
   }
   else return res.render("signin",{title:"signIn"}); 
}

module.exports.createSession = function(req,res)
{   
   req.flash('success','Logged in Successfully')
   
   return res.redirect("/"); 
}

module.exports.signout = function(req,res)
{ 
   //passport give this function to req 
   req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','You have logged out!');

      //we can also send context like logout successfully.but eeeee...
      res.redirect('/');
    });
}













