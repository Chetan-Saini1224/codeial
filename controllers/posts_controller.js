const postSchema = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  let obj = {};
  obj.content = req.body.content;
  obj.user = req.user._id;
  postSchema.create(obj, (err, post) => {
    if (err) {
      console.log("Error while creating post");
      return res.redirect("back");
    }
    console.log("post create successfully" + post);
    return res.redirect("back");
  });
};

module.exports.destroy = function (req, res) {
  postSchema.findById(req.params.id, function (err, post) {
    //.id means coverting object id into string express provide.
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
