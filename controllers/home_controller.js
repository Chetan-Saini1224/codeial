const postSchema = require("../models/post");

module.exports.home = function(req,res)
{
   //poulate user of each post
    postSchema.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'        //nexting to populate the user of comments
      }
    })
    .exec((err,posts_list) => {
        if(err)
        {
          console.log(err);  
          console.log("error in getting posts list");
          return res.redirect("back");
        }
        return res.render("home",{title:"home",posts_list});   
    })
}






















