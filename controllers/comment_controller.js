const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentsMailer = require("../mailers/comments_mailer")
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");

module.exports.create = async function (req, res) {

  try{
  let post = await Post.findById(req.body.post);
  
  if(post) 
  {
    let comment = await Comment.create(
    {
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
    });
  


    //it will automatically get the id out of comment
    post.comments.push(comment);
    //we can do like this to.
    //data in the memory we make the changes and the save()
    //will save data in db
    post.save();
    
    await comment.populate('user','name email');          
      

    //commentsMailer.newComment(comment);
    //create job inside queue if queue doesn't exist 
    //why job beacuse every task in queue is job
    let job = queue.create('emails',comment).save(function(err){
      if(err){
        console.log('error in creating a queue');
        return;
      }
      
      console.log(job.id);
    })
    
    
    if(req.xhr)
    {
      return res.status(200).json({
        data:{
          comment
        },
        message:"Comment Added"
     });
    }

    req.flash('success','Comment Published');
    res.redirect("/");
  }
}
catch(err)
{
  req.flash('erorr','Unable to Comment');
  console.log("Error : ",err);
  res.redirect("/");
}

}

module.exports.destroy = async function (req, res)
{
  try{
  let comment = await Comment.findById(req.params.id);


  if (req.user.id == comment.user)
  {
    let post_id = comment.post;

    await Like.deleteMany({likeable:comment,onModel:'Comment'});
    await comment.remove();

    await Post.findByIdAndUpdate(
      post_id,
    { $pull: { comments: req.params.id } }); //it will pull out this id from arr

    if(req.xhr)
    {
      return res.status(200).json({
        data:{
          comment_id : req.params.id 
        },
        message:"Comment Removed"
     });
    }

    req.flash('success','Comment Deleted Successfully');     
    return res.redirect("back"); 
  }
}
catch(err)
{
  req.flash('error','Error while Deleting Comment');
  console.log("Error ", err);
  return res.redirect("back"); 
}

};
