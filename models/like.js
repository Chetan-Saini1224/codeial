const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    //this define the id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        //mean here we are going to place a path to some other field
        // which help us to determine the model to ref
        refPath:'onModel'  
    },
    //this field is used for defining the type of liked object 
    //since it is dynamic ref
    onModel:{
        type:String,
        required: true,
        //either of the value can be ref enum means
        enum: ['Post','Comment'] 
    }
},{
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;
