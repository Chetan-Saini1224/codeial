const Like = require("../models/like");
const Comment  = require("../models/comment");
const Post = require("../models/post");

// likes/toogle/?id=abc&type=post/comment
module.exports.toogleLike = async function(req,res)
{
      try
      {
           let likeable;
           let deleted = false;
           if(req.query.type == "Post")
           {
            likeable = await Post.findById(req.query.id).populate('likes');
           }
           else{
            likeable = await Comment.findById(req.query.id).populate('likes');
           }

           //check if like alreday exist
           let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
           });
           
           //if like exist delete it
           if(existingLike)
           {
             likeable.likes.pull(existingLike._id);
             likeable.save();

             existingLike.remove();
             deleted = true;
           }
           else{
              let newLike = await  Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
              })
               
              likeable.likes.push(newLike._id);
              likeable.save();
           }
           return res.status(200).json({
                deleted:deleted
           });
      }
      catch(err){
        console.log("error  while toogle like",err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
      }
}