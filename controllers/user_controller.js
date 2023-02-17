const userSchema = require("../models/users")
const resetPasswordToken = require("../models/reset_password_token")
const Friendship = require("../models/friendship")
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const resetPasswordMailer = require("../mailers/reset_password");

module.exports.profile = async function(req,res)
{
   let friend = await Friendship.findOne({from_user:req.user.id,to_user:req.params.id});
   let user = await userSchema.findById(req.params.id);
   if(friend) friend = true;
   return res.render('users',{
      title:"users profile",
      profile_user:user,
      friend
   }); 
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

module.exports.forgetPassword = function(req,res)
{ 
   if(req.isAuthenticated())
   { 
      return res.redirect("profile");
   }
   
   return res.render("forget_password",{title:"Forget Password"});  
}


module.exports.forget_password = async function(req,res)
{ 
   if(req.isAuthenticated())
   { 
      return res.redirect("profile");
   }
   
   let user =  await userSchema.findOne({email:req.body.email});

   //not right way .. multiple page rendered
   // if(user) return res.render("",{confirmation:"Email has been sent to reset your password",title:"Forget Password"}); 
   // return res.render("forget_password",{confirmation:"No Account Found with this email",title:"Forget Password"});

   if(user)
   {
      req.flash('success','Email has been sent to reset your password'); 

      let resetToken = await resetPasswordToken.create({user:user.id,
      isvalid:true,
      accesstoken: crypto.randomBytes(20).toString('hex')});
      
      await resetToken.populate('user','email');
      
      resetPasswordMailer.resetPassword(resetToken);
   }
   else req.flash('error','No Account Found with this email');

   return res.redirect("back");
}


module.exports.resetPasswordEmail =async function(req,res)
{ 
   try{
      const token = await  resetPasswordToken.findOne({accesstoken:req.params.token})
      return res.render("create_password",{title:"Create Password",token});  
   }
   catch(err){
      console.log("error sending new password page",err);
      return res.redirect("back");
   }
}

module.exports.reset_Password_Email =async function(req,res)
{ 
   try{
   let token = await resetPasswordToken.findById(req.body.tokenId);
   if(!token.isvalid){
      req.flash('error','Token Expired create new request to change password');
      return res.redirect("back"); 
   }    
   console.log(req.body);
   if(req.body.password !=  req.body.confirmPassword)
   {
      req.flash('error','Both field must contain same value');  
   }
   else if(req.body.password ==  req.body.confirmPassword){
      await userSchema.findByIdAndUpdate(req.body.uid,{password:req.body.password});
      await resetPasswordToken.findByIdAndUpdate(req.body.tokenId,{isvalid:false}); 
      req.flash('success','Password Updated Successfully'); 
   }
   return res.redirect("back"); 
   }
   catch(err){
      console.log("error in reseting new password",err);
      return res.redirect("back");
   } 
}


