const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join("/uploads/users/avatars/");

const userSchema = new mongoose.Schema({
    email:{
     type: String,
     required: true,
     unique : true,   
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
    },
    //just to optimize query
    friendship:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Friendship'
      }
    ]
},{
    timestamps: true 
});
//timestamp help 
//us to store createdAT and updatedAT


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
  //file.fieldname mean field name : (avatar) prefix in file name

  //static
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;
  //just made path publically available




const User = mongoose.model('user',userSchema);
module.exports = User;