const Friendship = require("../models/friendship");
const User = require("../models/users");


module.exports.toogleFriend = async function(req,res)
{
      try
      {
           if(req.user.id == req.params.id)
           {
                return res.status(401).json({
                message:"Unauthorized Request"
               });
           }
           let friend = false;

           let user = await User.findById(req.user.id).populate('friendship');
           let friendExist = user.friendship.find((ele) => {
              return ele.to_user == req.params.id
           });
           
           if(friendExist)
           {
                let friendshipObj = await Friendship.findOneAndDelete({
                    from_user : req.user.id,
                    to_user : req.params.id
                });
                console.log(friendshipObj);  
                user.friendship.pull(friendshipObj);
                user.save();
                
                return res.status(200).json({
                    message:"Unfriended Successfully",
                    friend
                });
           }  

           let newfriend = await  Friendship.create({
            from_user:req.user.id,
            to_user:req.params.id
           }); 
           await User.findByIdAndUpdate(req.user.id,{"$push": { "friendship": newfriend._id }});

            
            return res.status(200).json({
                message:"Friend Added Successfully",
                friend : true
           });
            
      }
      catch(err){
        console.log("error  while toogle like",err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
      }
}