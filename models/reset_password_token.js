const mongoose = require("mongoose");

const rpTokenSchema = new mongoose.Schema({
    accesstoken:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isvalid:{
      type: Boolean,
      required: true
    } 
  },{
    timestamps: true
})

const  rpToken = mongoose.model('password_token_Token',rpTokenSchema);
module.exports = rpToken;