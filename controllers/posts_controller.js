const postSchema = require("../models/post");


module.exports.create = function(req,res)
{
    let obj = {};
    obj.content = req.body.content;
    obj.user = req.user._id;
    postSchema.create(obj,(err,post)=>{
        if(err)
        {
            console.log("Error while creating post");
            return res.redirect("back");
        }
        console.log("post create successfully" + post);
        return res.redirect("back");
    }); 
}