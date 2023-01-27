const mongoose = require('mongoose');

//When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('open',function(){
    console.log("connected to db mongo db");
})

module.exports = db;