const mongoose = require("mongoose");


const friendshipSchema = new mongoose.Schema({
    //the user who send the request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},{
   timestamps: true 
});


const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;