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
   let friends = await user.findById(req.user.id).populate({
    path:'friendship',
    populate:{
      path:'to_user'        //nexting to populate the user of comments
    }
    });
   return res.render("home",{
     title:"home",
     posts_list,
     all_users:users,
     friends: friends.friendship
   });
}
  catch(err)
  {
    console.log("Error : " , err);
    return res.redirect("back");
  }   
}






















