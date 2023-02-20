const postSchema = require("../models/post");
const user = require("../models/users");
module.exports.home = async function(req,res)
{
try{
   //poulate user of each post
   let posts_list = await postSchema.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
     path:'comments',
     populate:{
       path:'user'        //nexting to populate the user of comments
     }
   });

   let users = await user.find({});
   let data = {
    title:"home",
    posts_list,
    all_users:users,    
  }

   if(req.user)
   {
   let friends = await user.findById(req.user.id).populate({
    path:'friendship',
    populate:{
      path:'to_user'        
    }
    });
    data.friends = friends.friendship;
   }


   return res.render("home",data);

}
  catch(err)
  {
    console.log("Error : " , err);
    return res.redirect("back");
  }   
}






















