const postSchema = require("../../../models/post");
const Comment = require("../../../models/comment");

//cant directly delet risky
//index used when you list down something
module.exports.index = async function(req,res) 
{
   let posts_list = await postSchema.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
     path:'comments',
     populate:{
       path:'user'        //nexting to populate the user of comments
     }
   });
   return res.status(200).json({
        message: "list of post",
        post: posts_list
     });
}

module.exports.destroy =async function (req, res) 
{
  try{
    let post = await postSchema.findById(req.params.id);

    if(post.user == req.user.id)
    {
      
    post.remove();

    await Comment.deleteMany({ post: req.params.id });
 
      return res.status(200).json({
         message: "Post and associated comments deleted successfully"
    });

    }
    else
    {
      return res.status(401).json({
        message: "you can't delete this post"
      })
    }
  }
  catch(err)
  {
    console.log("Error : ",err);
    return res.status(500).json({
      message: "Internal Server error"
    })
  }
    
}