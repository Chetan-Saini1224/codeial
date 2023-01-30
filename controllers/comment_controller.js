const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function(req,res)
{
    console.log(req.body.post);
    Post.findById(req.body.post,(err,post)=>{
        if(err)
        {
            console.log("error in finding post");
            return res.redirect("/");
        }
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            },(err,comment) => {
                if(err)
                {
                    console.log("error in creating post");
                    return res.redirect("/");
                }
                //it will automatically fetch the id out of comment
                post.comments.push(comment);
                //we can do like this to.
                //data in the memory we make the changes and the save()
                //will save data in db
                post.save();
                res.redirect("/");
            })
         }
      })
}