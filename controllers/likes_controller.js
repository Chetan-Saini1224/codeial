const Like = require("../models/like");
const Comment  = require("../models/comment");
const Post = require("../models/post");


module.exports.toogleLike = async function(req,res)
{
      try{

      }
      catch(err){
        console.log("error  while toogle like",err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
      }
}