const postSchema = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
module.exports.create =async function (req, res) {
  try{
  let obj = {};
  obj.content = req.body.content;
  obj.user = req.user._id;
  let post = await postSchema.create(obj);
  
  await post.populate('user');

  if(req.xhr)
  {
    return res.status(200).json({
      data:{
        post : post
      },
      message: "Post Published"
    });
  }
  
  //return res.redirect("back");
  }
  catch(err)
  {
    req.flash('erorr','Error While Posting');
    console.log("Error : ",err);
    res.redirect("back");
  }
};

module.exports.destroy =async function (req, res) 
{
  try{
    let post = await postSchema.findById(req.params.id);
    //.id means coverting object id into string express provide.
    if (post.user == req.user.id) {
      
      await Like.deleteMany({likeable:post,onModel:'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});

      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
           data:{
             post_id : req.params.id
           },
           message:"Post Deleted Successfully"
        });
      }  

      return res.redirect("back");
    } 
  }
  catch(err)
  {
    req.flash('erorr','Error While Deleting Post');
    console.log("Error : ",err);
    res.redirect("back");
  }
    
}
